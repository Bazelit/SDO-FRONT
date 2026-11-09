import React from 'react';
import styled from 'styled-components';

const LabItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px; /* Увеличиваем расстояние между названием и статусом */
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const LabName = styled.p`
  font-size: 16px;
  color: #000;
  margin: 0;
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const LabGrade = styled.p`
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ $status }) =>
    $status === "success"
      ? "#2E7D32"
      : $status === "notStarted"
        ? "#757575"
        : "#C62828"};
  color: white;
  margin: 0;
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
`;

const LabItem = ({ name, grade }) => {
  const normalizedStatus = String(grade ?? "").trim().toLowerCase();
  const isSuccessful = ["success", "passed"].includes(normalizedStatus);
  const isNotStarted =
    ["", "not_started", "pending", "unknown"].includes(normalizedStatus);
  const status = isSuccessful ? "success" : isNotStarted ? "notStarted" : "failed";
  const displayStatus = isSuccessful
    ? "Сдано"
    : isNotStarted
      ? "Не начато"
      : "Не сдано";

  return (
    <LabItemContainer>
      <LabName>{name}</LabName>
      <LabGrade $status={status}>{displayStatus}</LabGrade>
    </LabItemContainer>
  );
};

export default LabItem;