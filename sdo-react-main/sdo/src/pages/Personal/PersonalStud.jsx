import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getUserData, getStudentStats } from '../../api/user-api';
import { getSubjects } from '../../api/subjects-api';
import { useNavigate } from "react-router-dom";
import { IoPieChart, IoList, IoTrendingUp } from "react-icons/io5";

const SectionLab = styled.div`
  width: 100%;
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  display: flex;
  gap: 100px;
  justify-content: center;
  padding: 50px 0px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    gap: 80px;
    padding: 45px 20px;
  }

  @media (max-width: 900px) {
    gap: 60px;
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 40px 16px 80px;
  }

  @media (max-width: 570px) {
    gap: 36px;
    padding: 36px 16px 70px;
  }

  @media (max-width: 480px) {
    gap: 32px;
    padding: 32px 16px 60px;
  }
`;

const List = styled.div`
  width: 350px;
  padding: 20px;
  background-color: #BECBEE;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 320px;
    padding: 18px;
  }

  @media (max-width: 900px) {
    width: 300px;
    padding: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    padding: 18px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    padding: 17px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 16px;
  }
`;

const ListSubject = styled.div`
  width: 500px;
  height: 100%;
  max-height: 30px;
  padding: 15px 25px;
  background-color: #fff;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 10px;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 450px;
    padding: 14px 22px;
  }

  @media (max-width: 900px) {
    max-width: 400px;
    padding: 13px 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 40px;
    padding: 12px 20px;
  }

  @media (max-width: 570px) {
    padding: 11px 18px;
    min-height: 38px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    min-height: 36px;
  }
`;

const BigList = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #E6F4CF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    max-width: 650px;
    padding: 35px 30px;
    gap: 28px;
  }

  @media (max-width: 900px) {
    max-width: 550px;
    padding: 32px 25px;
    gap: 26px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    padding: 30px 20px;
    gap: 24px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    padding: 27px 18px;
    gap: 22px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 24px 16px;
    gap: 20px;
  }
`;

const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0; 
  text-align: center;
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
  text-align: center;
  color: #000;

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
  text-align: center;
  color: #000;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const RowBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    gap: 28px;
  }

  @media (max-width: 900px) {
    gap: 26px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    gap: 24px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    gap: 22px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    gap: 20px;
  }
`;

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Analytics = styled.section`
  width: calc(100% - 40px);
  max-width: 1150px;
  margin: 0 auto 60px;
  padding: 40px;
  background-color: #E6F4CF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 768px) {
    padding: 30px 20px;
    gap: 24px;
  }

  @media (max-width: 570px) {
    width: calc(100% - 32px);
    padding: 24px 16px;
    gap: 20px;
  }
`;

const AnalyticsTitle = styled.p`
  margin: 0;
  font-size: 18px;
  color: #000;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const StatCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StatCard = styled.div`
  flex: 1 1 240px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
`;

const StatTop = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatIcon = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  color: #0f1220;

  ${({ $boxed }) =>
    $boxed &&
    `
    background-color: #0f1220;
    color: #fff;
    border-radius: 10px;
    font-size: 26px;
  `}
`;

const StatLabel = styled.p`
  margin: 0;
  font-size: 16px;
  color: #000;
`;

const StatValue = styled.p`
  margin: 4px 0 0;
  font-size: 26px;
  font-weight: 700;
  color: #000;
`;

const Bar = styled.div`
  width: 100%;
  height: 12px;
  background-color: #D9D9D9;
  border-radius: 6px;
  overflow: hidden;
  ${({ $grow }) => $grow && "flex: 1;"}
`;

const BarFill = styled.div`
  height: 100%;
  width: ${({ $value }) => Math.min(100, Math.max(0, $value || 0))}%;
  background-color: #9BBF8C;
  border-radius: 6px;
  transition: width 0.4s ease;
`;

const SubjectsProgress = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
`;

const SubjectsProgressTitle = styled.p`
  margin: 0 0 4px;
  font-size: 16px;
  color: #000;
`;

const SubjectRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #F0F0F0;
  border-radius: 7px;
  padding: 12px 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px 12px;
    padding: 12px 16px;
  }
`;

const SubjectName = styled.span`
  flex: 0 0 38%;
  font-size: 16px;
  color: #000;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    font-size: 15px;
  }
`;

const SubjectPercent = styled.span`
  min-width: 56px;
  text-align: right;
  font-size: 20px;
  font-weight: 700;
  color: #000;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 15px;
  color: #666;
`;

export function StudentAnalytics({ stats }) {
  const hasMark = stats.average_mark !== null && stats.average_mark !== undefined;
  const doneShare = stats.total_tasks ? (stats.completed_tasks / stats.total_tasks) * 100 : 0;

  return (
    <Analytics>
      <AnalyticsTitle>Аналитика успеваемости</AnalyticsTitle>

      <StatCards>
        <StatCard>
          <StatTop>
            <StatIcon><IoPieChart /></StatIcon>
            <div>
              <StatLabel>Средний прогресс</StatLabel>
              <StatValue>{stats.average_progress}%</StatValue>
            </div>
          </StatTop>
          <Bar><BarFill $value={stats.average_progress} /></Bar>
        </StatCard>

        <StatCard>
          <StatTop>
            <StatIcon><IoList /></StatIcon>
            <div>
              <StatLabel>Сдано лабораторных</StatLabel>
              <StatValue>{stats.completed_tasks}/{stats.total_tasks}</StatValue>
            </div>
          </StatTop>
          <Bar><BarFill $value={doneShare} /></Bar>
        </StatCard>

        <StatCard>
          <StatTop>
            <StatIcon $boxed><IoTrendingUp /></StatIcon>
            <div>
              <StatLabel>Средний балл</StatLabel>
              <StatValue>{hasMark ? `${stats.average_mark}%` : "—"}</StatValue>
            </div>
          </StatTop>
          <Bar><BarFill $value={hasMark ? stats.average_mark : 0} /></Bar>
        </StatCard>
      </StatCards>

      <SubjectsProgress>
        <SubjectsProgressTitle>Прогресс по дисциплинам</SubjectsProgressTitle>
        {stats.subjects.length === 0 && <EmptyText>Нет данных</EmptyText>}
        {stats.subjects.map((item) => (
          <SubjectRow key={item.id} title={`Сдано ${item.completed} из ${item.total}`}>
            <SubjectName>{item.name}</SubjectName>
            <Bar $grow><BarFill $value={item.progress} /></Bar>
            <SubjectPercent>{item.progress}%</SubjectPercent>
          </SubjectRow>
        ))}
      </SubjectsProgress>
    </Analytics>
  );
}

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
  const [stats, setStats] = useState(null);

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

    getStudentStats()
      .then(res => {
        setStats(res.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <Page>
      <SectionLab>
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
            {subjectsInfo.map((item) => (
              <ListSubject
                key={item.id}
                onClick={() => {
                  localStorage.setItem('subject', item.id);
                  localStorage.setItem('subjectName', item.name);
                  navigate('/disciplinesStud');
                }}
              >
                <TextDiscipline>{item.name}</TextDiscipline>
              </ListSubject>
            ))}
          </BigList>
        </RowBlocks>
      </SectionLab>
      {stats && <StudentAnalytics stats={stats} />}
    </Page>
  );
}