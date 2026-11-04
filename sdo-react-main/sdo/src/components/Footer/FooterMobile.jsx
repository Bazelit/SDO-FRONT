import "./style.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import main from "../../img/main.svg";
import labs from "../../img/labs.svg";
import lk from "../../img/lk.svg";
import add from "../../img/add.svg";


const FooterStyle = styled.footer`
    bottom: 0;
    margin-top: 20px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 82px;
    background-color: #DDE5F8;
    display: none;
    z-index: 1000;
    text-align: center;

    @media (max-width: 480px) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .navBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: black;
        width: 50%;
        font-family: "Montserrat";
        font-size: 10px;
    }

    .navBtn img {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
    }
`;


const FooterMobile = ({ setIsLoggedIn, isLoggedIn }) => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("status");
        setUserRole(role);
    }, [isLoggedIn]);

    const getPersonalAccount = () => {
        const role = localStorage.getItem("status");
        return role === "student" ? "/PersonalStud" : "/PersonalTeacher";
    };

    const getLaboratoryRoute = () => {
        const role = localStorage.getItem("status");
        return role === "student" ? "/StudLaboratory" : "/laboratory";
    };

    return (
        <>
            {isLoggedIn && (
                <FooterStyle>
                    {userRole === "student" && (
                        <>
                            <Link to="/" className="navBtn">
                                <img src={main} alt="" />
                                <span>Главная</span>
                            </Link>

                            <Link to="/StudLaboratory" className="navBtn">
                                <img src={labs} alt="" />
                                <span>Лабораторные работы</span>
                            </Link>

                            <Link to="/PersonalStud" className="navBtn">
                                <img src={lk} alt="" />
                                <span>Личный кабинет</span>
                            </Link>
                        </>
                    )}

                    {userRole === "teacher" && (
                        <>
                            <Link to="/laboratory" className="navBtn">
                                <img src={labs} alt="" />
                                <span>Лабораторные работы</span>
                            </Link>

                            <Link to="/LaboratoryAdd" className="navBtn">
                                <img src={add} alt="" />
                                <span>Добавить лабораторную</span>
                            </Link>

                            <Link to="/PersonalTeacher" className="navBtn">
                                <img src={lk} alt="" />
                                <span>Личный кабинет</span>
                            </Link>
                        </>
                    )}
                </FooterStyle>
            )}
        </>
    );
};

export default FooterMobile;