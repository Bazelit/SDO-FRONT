import React from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTeacherTheme } from "../ThemeContext";

const Section = styled.div`
  font-family: "Montserrat", sans-serif;
  background-color: var(--chrome, #c8d5f6);
  width: 100%;    
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 10px 0;
  flex-shrink: 0; /* Предотвращает сжатие футера */
  min-height: 80px; /* Высота футера (как раньше: 60px + отступы) */
  text-align: center;

  p {
    margin: 0;
    padding: 0 16px;
  }

  @media (max-width: 600px) {
    min-height: 68px;
    font-size: 13px;
    gap: 12px;
    padding: 12px 16px;
    flex-wrap: wrap;
    p { padding: 0; }
  }
`;

const ThemeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  padding: 8px;
  border: 0;
  border-radius: 7px;
  background: var(--header-button, #fff);
  color: var(--text, #415588);
  cursor: pointer;
  &:hover { background: var(--accent-hover, #dde5f9); }
  &:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
  svg { width: 18px; height: 18px; }
  @media (max-width: 600px) {
    flex-basis: 44px;
    width: 44px;
    height: 44px;
  }
`;

const Footer = () => {
  const { theme, canToggleTheme, toggleTheme } = useTeacherTheme();

  return (
    <Section>
      <p>© 2026 Все права защищены</p>
      {canToggleTheme && (
        <ThemeButton
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
          aria-pressed={theme === "dark"}
          title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
        >
          {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
        </ThemeButton>
      )}
    </Section>
  );
};

export default Footer;