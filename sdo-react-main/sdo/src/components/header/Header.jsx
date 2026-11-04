import "./style.css";
import logo from "../../img/Logo_Polytech_rus_main.svg";
import React, { useState, useEffect } from "react";
import Bread from "../BreadCrumbs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  width: 100%;
  background-color: #c8d5f6;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: ${({ $maxWidth }) => $maxWidth || "1440px"};
  padding: ${({ $padding }) => $padding || "12px 40px 0 60px"};

  img {
    display: block;
    height: 56px;
    width: auto;
    transition: height 0.3s ease;
  }

  @media (max-width: 1200px) { img { height: 55px; } }
  @media (max-width: 1024px) { img { height: 52px; } }
  @media (max-width: 900px) { img { height: 50px; } }
  @media (max-width: 768px) { img { height: 48px; } }
  @media (max-width: 640px) { img { height: 44px; } }
  @media (max-width: 570px) { img { height: 42px; } }
  @media (max-width: 480px) { img { height: 38px; } }
  @media (max-width: 400px) { img { height: 36px; } }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  gap: 16px;
  box-sizing: border-box;
  min-width: 0;

  .header__nav-lr {
    color: #415588;
    text-decoration: none;
    font-size: 16px;
    font-family: "Montserrat";
    line-height: 1.5;
    background-color: #fff;
    width: 232px;
    height: 36px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    white-space: nowrap;
    box-sizing: border-box;
    font-weight: 500;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header__nav-lr:hover {
    color: #fff;
    background-color: #dde5f9;
    transform: translateY(-1px);
  }

  @media (max-width: 2560px) {
    .label-full { display: inline; }
    .label-short { display: none; }
  }
  @media (max-width: 1200px) {
    .header__nav-lr { width: auto; padding: 0 20px; font-size: 15.5px; }
  }
  @media (max-width: 1024px) {
    .header__nav-lr { padding: 0 18px; font-size: 15px; }
  }
  @media (max-width: 900px) {
    .header__nav-lr { padding: 0 16px; font-size: 14.5px; }
  }
  @media (max-width: 768px) {
    .header__nav-lr { padding: 0 14px; font-size: 13.5px; }
  }
  @media (max-width: 640px) {
    .header__nav-lr { padding: 0 12px; font-size: 13px; }
  }
  @media (max-width: 570px) {
    .header__nav-lr {
      max-width: 90px; padding: 0 10px; height: 30px; font-size: 12px;
    }
    .label-full { display: none; }
    .label-short { display: inline; }
  }
  @media (max-width: 480px) {
    .header__nav-lr {
      max-width: 75px; padding: 0 8px; height: 28px; font-size: 11px;
    }
  }
`;

const ButtonEx = styled.button`
  color: #415588;
  font-size: 16px;
  font-family: "Montserrat";
  line-height: 1.5;
  background-color: #fff;
  width: 232px;
  height: 36px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  white-space: nowrap;
  font-weight: 500;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #fff;
    background-color: #dde5f9;
    transform: translateY(-1px);
  }

  @media (max-width: 1200px) { width: auto; padding: 0 20px; font-size: 15.5px; }
  @media (max-width: 1024px) { padding: 0 18px; font-size: 15px; }
  @media (max-width: 900px) { padding: 0 16px; font-size: 14.5px; }
  @media (max-width: 768px) { padding: 0 14px; font-size: 13.5px; }
  @media (max-width: 640px) { padding: 0 12px; font-size: 13px; }
  @media (max-width: 570px) { max-width: 70px; padding: 0 10px; height: 30px; font-size: 12px; }
  @media (max-width: 480px) { display: none; }
`;

const PAGE_CONFIG = {
  "/personalteacher": { maxWidth: "1140px", padding: "12px 0 0 0" },
  "/personalstud":    { maxWidth: "1030px", padding: "12px 0 0 0" },
  "/laboratory":      { maxWidth: "1236px", padding: "12px 0 0 0" },
  "/studlaboratory":  { maxWidth: "1270px", padding: "12px 0 0 0" },
  "/laboratoryadd":   { maxWidth: "1248px", padding: "12px 0 0 0" },
  "/prepodredlab":    { maxWidth: "1248px", padding: "12px 0 0 0" },
  "/checklabteacher": { maxWidth: "1248px", padding: "12px 0 0 0" },
  default:            { maxWidth: "1440px", padding: "12px 40px 0 60px" },
};

const getPageConfig = (pathname) => {
  const lowerPath = pathname.toLowerCase();

  
  if (PAGE_CONFIG[lowerPath]) {
    console.log(" Точное совпадение:", lowerPath, PAGE_CONFIG[lowerPath]);
    return PAGE_CONFIG[lowerPath];
  }

  
  const sortedKeys = Object.keys(PAGE_CONFIG)
    .filter((k) => k !== "default")
    .sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    if (lowerPath === key || lowerPath.startsWith(key + "/")) {
      return PAGE_CONFIG[key];
    }
  }

  return PAGE_CONFIG.default;
};

const Header = ({ setIsLoggedIn, isLoggedIn }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const config = getPageConfig(location.pathname);

  console.log(" Выбранный config:", config);
  

  useEffect(() => {
    const role = localStorage.getItem("status");
    setUserRole(role);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("status");
    setIsLoggedIn(false);
    navigate("/");
  };

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
      <HeaderStyle>
        <HeaderWrapper $maxWidth={config.maxWidth} $padding={config.padding}>
          <div>
            <Link to="/">
              <img src={logo} alt="логотип" />
            </Link>
          </div>
          <Nav>
            {isLoggedIn ? (
              <>
                <Link to={getPersonalAccount()} className="header__nav-lr">
                  <span className="label-full">Личный кабинет</span>
                  <span className="label-short">Лич. кабинет</span>
                </Link>

                <Link to={getLaboratoryRoute()} className="header__nav-lr">
                  <span className="label-full">Лабораторные работы</span>
                  <span className="label-short">Лаб. работы</span>
                </Link>

                <ButtonEx onClick={handleLogout}>Выйти</ButtonEx>
              </>
            ) : (
              <Link to="/login" className="header__nav-lr">
                <span className="label-full">Войти</span>
                <span className="label-short">Войти</span>
              </Link>
            )}
          </Nav>
        </HeaderWrapper>
      </HeaderStyle>
      <Bread />
    </>
  );
};

export default Header;