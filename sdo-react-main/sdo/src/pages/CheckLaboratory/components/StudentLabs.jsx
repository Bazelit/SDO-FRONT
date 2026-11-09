import React, { useState } from "react";
import styled from "styled-components";
import LabWorkItem from "./LabWorkItem";

const StyledContainer = styled.div`
  background-color: #eff5e5;
  font-family: "Montserrat";
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  transition: background-color 0.3s;
  background-color: ${({ allPassed }) => (allPassed ? "#EFF5E5" : "#F9DFDF")};
  gap: 12px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 12px 16px;
  }
`;

const StudentName = styled.div`
  font-weight: normal;
  font-size: 20px;
`;

const LabWorkContainer = styled.div`
  display: flex;
  align-items: center;

  > div {
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    width: 100%;

    > div {
      margin-left: 0 !important;
      width: 100%;
      justify-content: space-between;
    }
  }
`;

const ChangeButton = styled.button`
  margin-left: 10px;
  font-weight: normal;
  font-size: 20px;
  background-color: #becbee;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 42px;
  padding: 0 15px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-left: 0;
  }
`;

const ScoreEditor = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 10px;

  input {
    width: 76px;
    height: 36px;
    box-sizing: border-box;
    text-align: center;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    margin-left: 0;
  }
`;

const StudentLabs = ({ studentName, labWorks }) => {
  const [scores, setScores] = useState(labWorks.map((work) => work.score));
  const [editingIndex, setEditingIndex] = useState(null);
  const [scoreInput, setScoreInput] = useState("");

  const handleChangeScore = (index) => {
    setScoreInput(String(scores[index] ?? ""));
    setEditingIndex(index);
  };

  const handleSaveScore = (index) => {
    const score = Number(scoreInput);
    if (
      scoreInput.trim() === "" ||
      !Number.isFinite(score) ||
      score < 0 ||
      score > 100
    ) {
      return;
    }

    setScores((currentScores) =>
      currentScores.map((currentScore, scoreIndex) =>
        scoreIndex === index ? score : currentScore,
      ),
    );
    setEditingIndex(null);
  };

  // Проверяем, все ли работы сданы
  const allPassed = labWorks.every((work) => work?.passed);

  return (
    <StyledContainer allPassed={allPassed}>
      <StudentName>{studentName}</StudentName>

      <LabWorkContainer>
        {labWorks.map((work, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            {work.passed !== undefined ? (
              <>
                <LabWorkItem score={scores[index]} passed={work.passed} />
                {editingIndex === index ? (
                  <ScoreEditor>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="any"
                      value={scoreInput}
                      onChange={(event) => {
                        const nextScore = event.target.value;
                        const numericScore = Number(nextScore);
                        if (
                          nextScore === "" ||
                          (Number.isFinite(numericScore) &&
                            numericScore >= 0 &&
                            numericScore <= 100)
                        ) {
                          setScoreInput(nextScore);
                        }
                      }}
                      aria-label="Оценка от 0 до 100"
                    />
                    <ChangeButton
                      disabled={
                        scoreInput.trim() === "" ||
                        !Number.isFinite(Number(scoreInput)) ||
                        Number(scoreInput) < 0 ||
                        Number(scoreInput) > 100
                      }
                      onClick={() => handleSaveScore(index)}
                    >
                      Сохранить
                    </ChangeButton>
                    <ChangeButton onClick={() => setEditingIndex(null)}>
                      Отмена
                    </ChangeButton>
                  </ScoreEditor>
                ) : (
                  <ChangeButton onClick={() => handleChangeScore(index)}>
                    Изменить оценку
                  </ChangeButton>
                )}
              </>
            ) : (
              <>
                <ChangeButton disabled>Не оценено</ChangeButton>
                <div style={{ marginLeft: "10px", fontSize: "20px" }}>
                  —
                </div>{" "}
                {/* Прочерк */}
              </>
            )}
          </div>
        ))}
      </LabWorkContainer>
    </StyledContainer>
  );
};

export default StudentLabs;
