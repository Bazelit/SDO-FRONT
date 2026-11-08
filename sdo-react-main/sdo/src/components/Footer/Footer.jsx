import React from "react";
import styled from "styled-components";

const Section = styled.div`
  font-family: "Montserrat", sans-serif;
  background-color: #c8d5f6;
  width: 100%;    
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  flex-shrink: 0; /* Предотвращает сжатие футера */
  min-height: 80px; /* Высота футера (как раньше: 60px + отступы) */
  text-align: center;

  p {
    margin: 0;
    padding: 0 16px;
  }

  @media (max-width: 600px) {
    min-height: 56px;
    font-size: 13px;
  }
`;

const Footer = () => {
  return (
    <Section>
      <p>© 2026 Все права защищены</p>
    </Section>
  );
};

export default Footer;