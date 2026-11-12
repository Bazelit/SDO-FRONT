import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = styled.nav`
  font-size: 16px;
  line-height: 27px;
  ol { display: flex; flex-wrap: wrap; gap: 0 4px; list-style: none; margin: 0; padding: 0; }
  li { min-width: 0; overflow-wrap: anywhere; }
  a { color: inherit; text-decoration: none; }
  a:hover { text-decoration: underline; }
  a:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
  @media (max-width: 600px) { font-size: 14px; }
`;

export default function GroupBreadcrumbs({ students = false, groupName = "" }) {
  return (
    <Navigation aria-label="Навигация по группам">
      <ol>
        <li><Link to="/PersonalTeacher">Личный кабинет</Link></li>
        <li><span aria-hidden="true">/ </span>{students
          ? <Link to="/groups">Группы</Link>
          : <span aria-current="page">Группы</span>}
        </li>
        {students && <li><span aria-hidden="true">/ </span>
          <span aria-current="page">Студенты{groupName ? ` группы ${groupName}` : ""}</span>
        </li>}
      </ol>
    </Navigation>
  );
}
