import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiList, FiPieChart, FiTrendingUp } from "react-icons/fi";
import { getStudentSubjectStatistics } from "../../api/student-subject-statistics-api";

const isStatisticsDemoEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_SUBJECT_STATISTICS_DEMO === "true";

function loadDashboardStatistics() {
  if (!isStatisticsDemoEnabled) {
    return getStudentSubjectStatistics();
  }

  return import("./subject-statistics.mock").then(
    ({ default: statistics }) => statistics,
  );
}

const StatisticsSection = styled.section`
  width: 100%;
  padding: 24px 36px;
  background-color: #e6f4cf;
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 18px 14px;
  }
`;

const Title = styled.h2`
  margin: 0 0 16px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  text-align: left;

  @media (max-width: 480px) {
    margin-bottom: 14px;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const SummaryCard = styled.div`
  min-width: 0;
  min-height: 84px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 14px;
  box-sizing: border-box;

  @media (max-width: 760px) {
    min-height: 72px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

const SummaryIcon = styled.span`
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background-color: #050505;
  color: #fff;
  font-size: 20px;
`;

const SummaryCopy = styled.div`
  min-width: 0;
`;

const SummaryLabel = styled.p`
  margin: 0 0 3px;
  color: #222;
  font-size: 12px;
  line-height: 1.3;
`;

const SummaryValue = styled.p`
  margin: 0;
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.15;
`;

const SubjectList = styled.div`
  padding: 14px;
  background-color: #fff;
  border-radius: 14px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ListTitle = styled.h3`
  margin: 0 0 12px;
  color: #222;
  font-size: 12px;
  font-weight: 500;
`;

const StatisticsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SubjectRow = styled.article`
  display: grid;
  grid-template-columns: minmax(160px, 1.15fr) minmax(100px, 1fr) 42px;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  padding: 7px 10px;
  background-color: #f0f0f0;
  border-radius: 10px;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr) 42px;
    gap: 5px 10px;
  }
`;

const SubjectName = styled.h4`
  min-width: 0;
  margin: 0;
  color: #111;
  font-size: 12px;
  font-weight: 500;
  overflow-wrap: anywhere;
`;

const NoTasks = styled.span`
  color: #555;
  font-size: 11px;
`;

const Progress = styled.progress`
  display: block;
  width: 100%;
  height: 10px;
  border: 0;
  border-radius: 8px;
  overflow: hidden;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #d7d7d7;
    border-radius: 8px;
  }

  &::-webkit-progress-value {
    background-color: #83bd83;
    border-radius: 8px;
  }

  &::-moz-progress-bar {
    background-color: #83bd83;
    border-radius: 8px;
  }

  @media (max-width: 600px) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
`;

const SubjectPercent = styled.p`
  margin: 0;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
`;

const Message = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
  text-align: center;
`;

const RetryButton = styled.button`
  display: block;
  margin: 12px auto 0;
  padding: 8px 14px;
  border: 0;
  border-radius: 6px;
  background-color: #becbee;
  color: #000;
  cursor: pointer;

  &:hover {
    background-color: #aab9e2;
  }

  &:focus-visible {
    outline: 2px solid #344d8a;
    outline-offset: 2px;
  }
`;

function getSubjectProgress(subject) {
  return subject.totalTasks === 0
    ? 0
    : Math.round((subject.completedTasks / subject.totalTasks) * 100);
}

function getSummary(statistics) {
  const completedTasks = statistics.reduce(
    (total, subject) => total + subject.completedTasks,
    0,
  );
  const totalTasks = statistics.reduce(
    (total, subject) => total + subject.totalTasks,
    0,
  );
  const averageProgress =
    statistics.length === 0
      ? 0
      : Math.round(
          statistics.reduce(
            (total, subject) => total + getSubjectProgress(subject),
            0,
          ) / statistics.length,
        );
  const completedSubjects = statistics.filter(
    (subject) =>
      subject.totalTasks > 0 &&
      subject.completedTasks === subject.totalTasks,
  ).length;

  return { completedTasks, totalTasks, averageProgress, completedSubjects };
}

const SummaryCards = ({ statistics }) => {
  const summary = getSummary(statistics);

  return (
    <SummaryGrid aria-label="Сводные показатели">
      <SummaryCard>
        <SummaryIcon aria-hidden="true">
          <FiPieChart />
        </SummaryIcon>
        <SummaryCopy>
          <SummaryLabel>Средний прогресс</SummaryLabel>
          <SummaryValue>{summary.averageProgress}%</SummaryValue>
        </SummaryCopy>
      </SummaryCard>
      <SummaryCard>
        <SummaryIcon aria-hidden="true">
          <FiList />
        </SummaryIcon>
        <SummaryCopy>
          <SummaryLabel>Сдано заданий</SummaryLabel>
          <SummaryValue>
            {summary.completedTasks}/{summary.totalTasks}
          </SummaryValue>
        </SummaryCopy>
      </SummaryCard>
      <SummaryCard>
        <SummaryIcon aria-hidden="true">
          <FiTrendingUp />
        </SummaryIcon>
        <SummaryCopy>
          <SummaryLabel>Завершено предметов</SummaryLabel>
          <SummaryValue>{summary.completedSubjects}</SummaryValue>
        </SummaryCopy>
      </SummaryCard>
    </SummaryGrid>
  );
};

const SubjectProgressList = ({ statistics }) => (
  <SubjectList>
    <ListTitle>Прогресс по дисциплинам</ListTitle>
    <StatisticsList>
      {statistics.map((subject) => {
        const progress = getSubjectProgress(subject);

        return (
          <SubjectRow key={subject.subjectId}>
            <SubjectName>{subject.subjectName}</SubjectName>
            {subject.totalTasks === 0 ? (
              <NoTasks>Нет заданий</NoTasks>
            ) : (
              <Progress
                aria-label={`Выполнение по предмету ${subject.subjectName}`}
                value={progress}
                max="100"
              />
            )}
            <SubjectPercent>{progress}%</SubjectPercent>
          </SubjectRow>
        );
      })}
    </StatisticsList>
  </SubjectList>
);

function validateStatistics(data) {
  if (!Array.isArray(data)) {
    throw new Error("Statistics loader must return an array.");
  }

  return data.map((item) => {
    const hasValidId =
      (typeof item?.subjectId === "string" &&
        item.subjectId.trim().length > 0) ||
      (typeof item?.subjectId === "number" && Number.isFinite(item.subjectId));
    const hasValidCounts =
      Number.isInteger(item?.completedTasks) &&
      Number.isInteger(item?.totalTasks) &&
      item.completedTasks >= 0 &&
      item.totalTasks >= 0 &&
      item.completedTasks <= item.totalTasks;

    if (
      !hasValidId ||
      typeof item?.subjectName !== "string" ||
      !item.subjectName.trim() ||
      !hasValidCounts
    ) {
      throw new Error("Statistics loader returned an invalid subject record.");
    }

    return item;
  });
}

export default function SubjectStatistics({
  loadStatistics = loadDashboardStatistics,
  onStatisticsLoaded,
}) {
  const [requestNumber, setRequestNumber] = useState(0);
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let isMounted = true;
    setState({ status: "loading" });

    Promise.resolve()
      .then(loadStatistics)
      .then(validateStatistics)
      .then((statistics) => {
        if (isMounted) {
          setState({ status: "success", statistics });
          if (onStatisticsLoaded) {
            onStatisticsLoaded(statistics);
          }
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки статистики по предметам:", error);
        if (isMounted) {
          setState({ status: "error" });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [loadStatistics, onStatisticsLoaded, requestNumber]);

  return (
    <StatisticsSection aria-labelledby="subject-statistics-title">
      <Title id="subject-statistics-title">Аналитика успеваемости</Title>

      {state.status === "loading" && (
        <Message role="status">Загрузка статистики...</Message>
      )}

      {state.status === "error" && (
        <div role="alert">
          <Message>Не удалось загрузить статистику по предметам.</Message>
          <RetryButton
            type="button"
            onClick={() => setRequestNumber((number) => number + 1)}
          >
            Повторить
          </RetryButton>
        </div>
      )}

      {state.status === "success" && state.statistics.length === 0 && (
        <Message role="status">Статистика по предметам пока отсутствует.</Message>
      )}

      {state.status === "success" && state.statistics.length > 0 && (
        <>
          <SummaryCards statistics={state.statistics} />
          <SubjectProgressList statistics={state.statistics} />
        </>
      )}
    </StatisticsSection>
  );
}
