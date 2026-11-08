import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import MainRouter from "./app/routing";
import Footer from "./components/Footer/Footer";
import FooterMobile from "./components/Footer/FooterMobile";
import styled from 'styled-components';
import "./styles/style.css";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token"),
  );

  useEffect(() => {
    // Проверка на токен при загрузке
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    // Слушатель изменений в localStorage
    const handleStorageChange = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Page>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Main>
              <MainRouter setIsLoggedIn={setIsLoggedIn} />
          </Main>
          <FooterMobile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Page>
      </Router>
    </div>
  );
}

export default App;
