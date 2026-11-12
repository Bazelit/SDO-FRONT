// src/components/DisciplineWindow.jsx
import React from "react";
import styled from "styled-components";

// Аналогичен вашему StyledContainer
const StyledContainer = styled.div`
  box-sizing: border-box;
  background-color: var(--discipline-card, #e6f4cf);
  font-family: "Montserrat";
  width: 100%;
  min-height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  transition: background-color 0.3s;
  border-radius: 7px;
  @media (max-width: 600px) {
    min-height: 86px;
    min-width: 0;
    margin: 0;
    padding: 12px;
    justify-content: center;
    border-radius: 8px;
  }
`;

const DisciplineContent = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    min-width: 0;
    width: 100%;
    justify-content: center;
  }
`;

const DisciplineName = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin-right: 10px;
  overflow: hidden;
  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 27px;
    margin: 0;
    text-align: center;
    overflow: visible;
    overflow-wrap: anywhere;
    hyphens: auto;
  }
`;

const ChooseButton = styled.button`
  font-weight: normal;
  font-size: 20px;
  background-color: var(--accent, #becbee);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 42px;
  padding: 0 15px;

  &:hover {
    background-color: var(--accent-hover, #0056b3);
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const DisciplineWindow = ({ disciplineName }) => {
  return (
    <StyledContainer>
      <DisciplineContent>
        <DisciplineName lang="ru">{disciplineName}</DisciplineName>
      </DisciplineContent>
      {/* Можно настроить кнопку под ваши задачи */}
      <ChooseButton>Выбрать</ChooseButton>
    </StyledContainer>
  );
};

export default DisciplineWindow;
