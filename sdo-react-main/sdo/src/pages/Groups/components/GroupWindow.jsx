import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled(Link)`
  min-width: 0;
  min-height: 104px;
  height: 100%;
  width: 100%;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-radius: 7px;
  background: ${({ $alternate }) => $alternate ? "var(--panel, #f0f0f0)" : "var(--panel, #e6f4cf)"};
  color: var(--text, #000);
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  .group-number { min-width: 0; overflow-wrap: anywhere; font-size: 20px; line-height: 27px; }
  .group-action {
    flex-shrink: 0;
    min-width: 221px;
    padding: 6px 16px;
    border-radius: 4px;
    background: var(--accent, #becbee);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    line-height: 27px;
    text-align: center;
  }
  &:hover { box-shadow: inset 0 0 0 2px var(--border, #becbee); }
  &:focus-visible { outline: 2px solid var(--border, #415588); outline-offset: 3px; }
  @media (max-width: 600px) {
    min-height: 86px;
    padding: 12px;
    justify-content: center;
    border-radius: 8px;
    background: var(--discipline-card, #e6f4cf);
    .group-number { font-size: 16px; font-weight: 600; text-align: center; }
    .group-action { display: none; }
  }
`;

export default function GroupWindow({ groupId, groupNumber, alternate = false }) {
  return (
    <Card to={`/groups/${encodeURIComponent(groupId)}`} $alternate={alternate}
      aria-label={`Перейти к группе ${groupNumber}`}>
      <span className="group-number">{groupNumber}</span>
      <span className="group-action" aria-hidden="true">Перейти к группе</span>
    </Card>
  );
}
