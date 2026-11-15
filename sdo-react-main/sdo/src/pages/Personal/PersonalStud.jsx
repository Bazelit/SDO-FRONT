import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import { getUserData } from '../../api/user-api';
import { getSubjects } from '../../api/subjects-api';
import { useNavigate } from "react-router-dom";
import SubjectStatistics from "./SubjectStatistics";

const isStatisticsDemoEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_SUBJECT_STATISTICS_DEMO === "true";

const SectionLab = styled.div`
  width: 100%;
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  padding: 32px 24px 50px;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 80px;
  }

  @media (max-width: 570px) {
    padding: 20px 16px 70px;
  }
`;

const DashboardContent = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DashboardTop = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.5fr);
  align-items: start;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const List = styled.div`
  width: 100%;
  min-height: 84px;
  padding: 14px 16px;
  background-color: #BECBEE;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 76px;
    padding: 14px;
  }
`;

const ListSubject = styled.div`
  width: 100%;
  min-height: 48px;
  padding: 8px 10px 8px 16px;
  background-color: #fff;
  border: 0;
  border-radius: 6px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 54px 126px;
  gap: 14px;
  align-items: center;
  text-align: left;
  font: inherit;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus-visible {
    outline: 2px solid #344d8a;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: minmax(0, 1fr) 48px 98px;
    gap: 8px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr) 44px 82px;
    gap: 6px;
  }
`;

const SubjectPercent = styled.span`
  min-height: 32px;
  display: grid;
  place-items: center;
  border-radius: 3px;
  background-color: ${({ $complete }) => ($complete ? "#19b20b" : "#d9d9d9")};
  color: #fff;
  font-size: 13px;
  font-weight: 500;
`;

const SubjectAction = styled.span`
  min-height: 32px;
  display: grid;
  place-items: center;
  border-radius: 3px;
  background-color: #becbee;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
`;

const BigList = styled.div`
  width: 100%;
  padding: 18px;
  background-color: #E6F4CF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 14px 12px;
  }
`;

const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0; 
  text-align: left;
  color: #000;

  @media (max-width: 1024px) {
    font-size: 17px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 570px) {
    font-size: 15.5px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const TextDiscipline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  margin: 0;
  text-align: left;
  color: #000;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const InfoText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #000;
  margin: 6px 0 0;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const RowBlocks = styled.div`
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    gap: 14px;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const getSubjectProgress = (subject) =>
  subject.totalTasks === 0
    ? 0
    : Math.round((subject.completedTasks / subject.totalTasks) * 100);

export default function PersonalStud() {
  const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState({
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    password: "",
    roleType: "",
    studyGroup: "",
    form_education: "",
    faculty: "",
  });

  const [subjectsInfo, setSubjectsInfo] = useState([]);
  const [statisticsInfo, setStatisticsInfo] = useState([]);

  const handleStatisticsLoaded = useCallback((statistics) => {
    setStatisticsInfo(statistics);
  }, []);

  const statisticsBySubjectId = new Map(
    statisticsInfo.map((item) => [String(item.subjectId), item]),
  );
  const dashboardSubjects =
    isStatisticsDemoEnabled || subjectsInfo.length === 0
      ? statisticsInfo.map((item) => ({
          id: item.subjectId,
          name: item.subjectName,
          progress: getSubjectProgress(item),
        }))
      : subjectsInfo.map((subject) => {
          const statistics = statisticsBySubjectId.get(String(subject.id));
          return {
            ...subject,
            progress:
              statistics === undefined
                ? null
                : getSubjectProgress(statistics),
          };
        });

  useEffect(() => {
    getUserData()
      .then(res => {
        setStudentInfo(res.data);
      })
      .catch(error => {
        console.error(error.message);
      });

    getSubjects()
      .then(res => {
        setSubjectsInfo(res.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <SectionLab>
      <DashboardContent>
        <DashboardTop>
          <RowBlocks>
            <List>
              <Text>ФИО студента:</Text>
              <InfoText>{studentInfo.last_name} {studentInfo.first_name} {studentInfo.middle_name}</InfoText>
            </List>
            <List>
              <Text>Номер группы:</Text>
              <InfoText>{studentInfo.studyGroup}</InfoText>
            </List>
            <List>
              <Text>Форма обучения:</Text>
              <InfoText>{studentInfo.form_education}</InfoText>
            </List>
            <List>
              <Text>Направление обучения:</Text>
              <InfoText>{studentInfo.faculty}</InfoText>
            </List>
          </RowBlocks>
          <RowBlocks>
            <BigList>
              <Text>Дисциплины:</Text>
              {dashboardSubjects.map((item) => (
                <ListSubject
                  as="button"
                  type="button"
                  key={item.id}
                  onClick={() => {
                    localStorage.setItem('subject', item.id);
                    localStorage.setItem('subjectName', item.name);
                    navigate('/disciplinesStud');
                  }}
                >
                  <TextDiscipline>{item.name}</TextDiscipline>
                  <SubjectPercent $complete={item.progress === 100}>
                    {item.progress === null ? "—" : `${item.progress}%`}
                  </SubjectPercent>
                  <SubjectAction>Перейти</SubjectAction>
                </ListSubject>
              ))}
            </BigList>
          </RowBlocks>
        </DashboardTop>
        <SubjectStatistics onStatisticsLoaded={handleStatisticsLoaded} />
      </DashboardContent>
    </SectionLab>
  );
}