import React from "react";
import styled from "styled-components";
import { useTeacherTheme } from "../../../components/ThemeContext";
import lightIcon from "../../../img/theme/search-light.svg";
import darkIcon from "../../../img/theme/search-dark.svg";

const Field = styled.div`
  position: relative;
  width: 395px;
  max-width: 100%;
  input {
    width: 100%;
    height: 47px;
    padding: 10px 44px 10px 12px;
    border: 0;
    border-radius: 8px;
    font: inherit;
    font-size: 16px;
    color: var(--text, #424451);
    background: var(--field, #f0f0f0);
  }
  input:focus-visible { outline: 2px solid var(--border, #415588); outline-offset: 3px; }
  img { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  @media (max-width: 600px) {
    width: 100%;
    input { height: 51px; }
  }
`;

export default function GroupSearch({ label, value, onChange }) {
  const { theme } = useTeacherTheme();
  return (
    <Field>
      <input type="text" aria-label={label} placeholder={label} value={value}
        onChange={event => onChange(event.target.value)} />
      <img src={theme === "dark" ? darkIcon : lightIcon} alt="" aria-hidden="true" />
    </Field>
  );
}
