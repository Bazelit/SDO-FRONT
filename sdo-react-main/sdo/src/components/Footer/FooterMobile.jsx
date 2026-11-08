import "./style.css";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import main from "../../img/main.svg";
import labs from "../../img/labs.svg";
import lk from "../../img/lk.svg";
import add from "../../img/add.svg";

/* Нижняя панель навигации для телефонов (до 600px).
   Закреплена внизу экрана, учитывает «чёлку»/полоску жестов на iPhone.
   Отступ под неё у страницы задаётся классом has-mobile-nav у body
   (см. src/styles/style.css). */
const FooterStyle = styled.nav`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(64px + env(safe-area-inset-bottom, 0px));
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background-color: #DDE5F8;
    box-shadow: 0 -1px 0 rgba(65, 85, 136, 0.15);
    display: none;
    z-index: 1000;
    text-align: center;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: stretch;
    }

    .navBtn {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 6px 4px;
        text-decoration: none;
        color: #252525;
        font-family: "Montserrat", sans-serif;
        font-size: 11px;
        line-height: 1.2;
        opacity: 0.75;
        transition: opacity 0.2s ease, background-color 0.2s ease;
    }

    .navBtn span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .navBtn.active {
        opacity: 1;
        font-weight: 600;
        background-color: rgba(200, 213, 246, 0.7);
    }

    .navBtn img {
        width: 24px;
        height: 24px;
    }
`;

const studentItems = [
    { to: "/", icon: main, label: "Главная" },
    { to: "/StudLaboratory", icon: labs, label: "Лабораторные" },
    { to: "/PersonalStud", icon: lk, label: "Кабинет" },
];

const teacherItems = [
    { to: "/laboratory", icon: labs, label: "Лабораторные" },
    { to: "/LaboratoryAdd", icon: add, label: "Добавить" },
    { to: "/PersonalTeacher", icon: lk, label: "Кабинет" },
];

const isActive = (pathname, to) => {
    const path = pathname.toLowerCase();
    const target = to.toLowerCase();
    if (target === "/") return path === "/";
    return path === target || path.startsWith(target + "/");
};

const FooterMobile = ({ setIsLoggedIn, isLoggedIn }) => {
    const location = useLocation();
    // Роль читаем при каждом рендере (в т.ч. при смене страницы):
    // при входе она записывается в localStorage чуть позже, чем isLoggedIn.
    const userRole = localStorage.getItem("status") || localStorage.getItem("role");

    const items =
        userRole === "student" ? studentItems : userRole === "teacher" ? teacherItems : [];
    const visible = isLoggedIn && items.length > 0;

    useEffect(() => {
        document.body.classList.toggle("has-mobile-nav", visible);
        return () => document.body.classList.remove("has-mobile-nav");
    }, [visible]);

    if (!visible) return null;

    return (
        <FooterStyle aria-label="Основная навигация">
            {items.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`navBtn ${isActive(location.pathname, item.to) ? "active" : ""}`}
                >
                    <img src={item.icon} alt="" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </FooterStyle>
    );
};

export default FooterMobile;
