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
  color: var(--text, #000);
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
  background-color: ${({ grade }) => (grade === 'Success' ? 'var(--success-bg, #85A4518C)' : 'var(--danger-bg, #FF7070)')};
  color: white;
  margin: 0;
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
`;

const LabItem = ({ name, grade }) => {
  const displayStatus = grade === 'Success' ? 'Сдано' : 'Не сдано';

  return (
    <LabItemContainer>
      <LabName>{name}</LabName>
      <LabGrade grade={grade}>{displayStatus}</LabGrade>
    </LabItemContainer>
  );
};

export default LabItem;