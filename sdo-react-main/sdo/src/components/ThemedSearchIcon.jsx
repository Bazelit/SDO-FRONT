import React from "react";
import { FaSearch } from "react-icons/fa";
import { useTeacherTheme } from "./ThemeContext";
import searchDark from "../img/theme/search-dark.svg";

export default function ThemedSearchIcon(props) {
  const { theme } = useTeacherTheme();
  return theme === "dark"
    ? <img {...props} src={searchDark} alt="" aria-hidden="true" />
    : <FaSearch {...props} aria-hidden="true" />;
}
