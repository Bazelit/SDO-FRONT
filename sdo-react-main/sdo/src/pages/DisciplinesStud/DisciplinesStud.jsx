import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LabItem from "./components/LabItem";
import { getTasks } from '../../api/subjects-api';
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px 60px;

  @media (max-width: 768px) {
    padding: 16px 16px 40px;
  }
  @media (max-width: 480px) {
    padding: 12px 12px 32px;
  }
`;

const Title = styled.p`
  font-size: 20px;
  color: #000;
  margin: 0;
`;

const TitleSection = styled.section`
  display: inline-block;
  background-color: #DDE5F8;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
  max-width: 100%;

  @media (max-width: 480px) {
    display: block;
    padding: 10px 14px;
    margin-bottom: 12px;
  }
`;

const GreenSection = styled.section`
  width: 100%;
  max-width: 1248px;
  background-color: #E6F4CF;
  border-radius: 8px;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const StatsTitle = styled.p`
  text-align: center;
  font-size: 18px;
  color: #000;
  margin-bottom: 30px;
  margin-top: 0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
`;

const StatBox = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 15px 20px;
  color: #000;
  width: 100%;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const LabRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ $failed }) => ($failed ? "#F9DFDF" : "#fff")};
  border-radius: 6px;
  padding: 10px 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 48px;
  cursor: pointer; /* Курсор как у кнопки */
  transition: background-color 0.3s ease; /* Плавный переход для hover */

  &:hover {
    background-color: ${({ $failed }) => ($failed ? "#F3CECE" : "#f5f5f5")};
  }
`;

const isLabNotStarted = (lab) =>
  ["", "not_started", "pending", "unknown"].includes(
    String(lab.status ?? "").trim().toLowerCase(),
  );

const isLabFailed = (lab) =>
  !["success", "passed"].includes(
    String(lab.status ?? "").trim().toLowerCase(),
  ) &&
  !(lab.completed !== true && isLabNotStarted(lab));

export default function DisciplinesStud() {
  const [labsInfo, setLabsInfo] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [stats, setStats] = useState({
    submitted: 0,
    grade: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedSubjectName = localStorage.getItem('subjectName') || "Неизвестная дисциплина";
    setSubjectName(storedSubjectName);

    getTasks(localStorage.getItem('subject'))
      .then(res => {
        const tasks = res.data;
        setLabsInfo(tasks);

        const totalTasks = tasks.length;
        const submitted = tasks.filter((task) =>
          ["success", "passed"].includes(
            String(task.status ?? "").trim().toLowerCase(),
          ),
        ).length;
        const grade = totalTasks > 0 ? Math.round((submitted / totalTasks) * 100) : 0;

        setStats({
          submitted,
          grade,
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Title>Дисциплина: {subjectName}</Title>
        </TitleSection>
        <GreenSection>
          <StatsTitle>Статистика по выполненным заданиям</StatsTitle>
          <StatsRow>
            <StatBox>Сдано: {stats.submitted} из {labsInfo.length}</StatBox>
            <StatBox>Текущая оценка: {stats.grade}%</StatBox>
          </StatsRow>
          <LabsContainer>
            {labsInfo.map((lab) => (
              <LabRow
                key={lab.id}
                $failed={isLabFailed(lab)}
                onClick={() => navigate(`/LabaStud/${lab.id}`)} // Делаем весь блок кликабельным
              >
                <LabItem name={lab.name} grade={lab.status} />
              </LabRow>
            ))}
          </LabsContainer>
        </GreenSection>
      </ContentWrapper>
    </PageContainer>
  );
}