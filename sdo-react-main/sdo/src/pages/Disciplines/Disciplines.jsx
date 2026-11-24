// src/pages/Disciplines.jsx
import React, { useState } from "react";
import styled from "styled-components";
import DisciplineWindow from "./components/DisciplineWindow";
import ThemedSearchIcon from "../../components/ThemedSearchIcon";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 32px 24px;
  }
`;

const DisciplinesContainer = styled.div`
  display: grid;
  margin: auto;
  width: 80%;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (max-width: 600px) {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 1fr;
    gap: 12px;

    > p {
      grid-column: 1 / -1;
    }
  }
`;

const SearchInput = styled.input`
  padding: 0;
  width: 100%;
  font-family: "Montserrat";
  height: 47px;
  box-sizing: border-box;
  background-color: var(--field, #f0f0f0);
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  color: var(--text, #000);
  text-align: center;

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    padding: 0 44px 0 12px;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 80%;
  max-width: 500px;
  margin-bottom: 30px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
    max-width: none;
    margin-bottom: 24px;
  }
`;

const SearchIcon = styled(ThemedSearchIcon)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text, #000);
`;

const Disciplines = () => {
  const disciplinesList = [
    "Базы данных",
    "Алгоритмы и структуры данных",
    "Программирование на JavaScript",
    "Операционные системы",
    "Компьютерные сети",
    "Математический анализ",
    "Дискретная математика",
  ];

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredSubjects = disciplinesList.filter((discipline) =>
    discipline.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <PageWrapper>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Поиск дисциплины"
          aria-label="Поиск дисциплины"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <SearchIcon />
      </SearchInputContainer>

      <DisciplinesContainer>
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((discipline, index) => (
            <DisciplineWindow key={index} disciplineName={discipline} />
          ))
        ) : (
          <p>Дисциплины не найдены</p>
        )}
      </DisciplinesContainer>
    </PageWrapper>
  );
};

export default Disciplines;
