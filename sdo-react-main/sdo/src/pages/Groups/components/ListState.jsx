import React from "react";
import styled from "styled-components";

const State = styled.div`
  padding: 24px 12px;
  text-align: center;
  line-height: 27px;
  p { margin: 0; }
  button {
    margin-top: 12px;
    min-height: 44px;
    padding: 8px 16px;
    border: 0;
    border-radius: 7px;
    font: inherit;
    background: var(--accent, #becbee);
    color: var(--text, #000);
    cursor: pointer;
  }
  button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
`;

export default function ListState({ message, onRetry, error = false }) {
  return (
    <State role={error ? "alert" : "status"}>
      <p>{message}</p>
      {onRetry && <button type="button" onClick={() => onRetry()}>Повторить загрузку</button>}
    </State>
  );
}
