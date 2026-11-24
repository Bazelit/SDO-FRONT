import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useTeacherGroups, useGroupStudents } from "./useTeacherGroupData";
import { Page, PageTitle, StudentList } from "./GroupPages.styles";
import GroupBreadcrumbs from "./components/GroupBreadcrumbs";
import GroupSearch from "./components/GroupSearch";
import ListState from "./components/ListState";

const StudentCard = styled(Link)`
  min-height: 70px;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  border-radius: 8px;
  background: var(--panel, #e6f4cf);
  color: var(--text, #000);
  text-decoration: none;
  .student-name { min-width: 0; font-size: 20px; line-height: 27px; overflow-wrap: anywhere; }
  .student-action {
    flex-shrink: 0;
    min-width: 161px;
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 27px;
    text-align: center;
    background: var(--accent, #becbee);
    color: #fff;
  }
  &:hover { box-shadow: inset 0 0 0 2px var(--border, #becbee); }
  &:focus-visible { outline: 2px solid var(--border, #415588); outline-offset: 3px; }
  @media (max-width: 600px) {
    padding: 24px;
    flex-direction: column;
    .student-name { font-size: 16px; text-align: center; }
    .student-action { width: 100%; min-width: 0; }
  }
`;

export default function StudentsByGroup() {
  const { groupId } = useParams();
  const [search, setSearch] = useState("");
  const groupsQuery = useTeacherGroups();
  const { data: students = [], isLoading, isFetching, isError, refetch } = useGroupStudents(groupId);
  const group = groupsQuery.data?.find(item => String(item.id) === groupId);
  const groupName = group?.name || students[0]?.studyGroup || "";
  const query = search.trim().toLocaleLowerCase("ru");
  const visibleStudents = students.filter(student => String(student.full_name || "").toLocaleLowerCase("ru").includes(query));

  useEffect(() => { setSearch(""); }, [groupId]);

  return (
    <Page>
      <PageTitle>Студенты{groupName ? ` группы ${groupName}` : " группы"}</PageTitle>
      <GroupBreadcrumbs students groupName={groupName} />
      <GroupSearch label="ФИО студента" value={search} onChange={setSearch} />
      {groupsQuery.isError && !groupName && <ListState error message="Не удалось загрузить название группы."
        onRetry={groupsQuery.isFetching ? undefined : groupsQuery.refetch} />}
      {isLoading || (isFetching && isError) ? <ListState message="Загрузка студентов..." />
        : isError ? <ListState error message="Не удалось загрузить студентов группы." onRetry={refetch} />
        : students.length === 0 ? <ListState message="Студенты не найдены" />
        : visibleStudents.length === 0 ? <ListState message="Студенты не найдены по вашему запросу" />
        : <StudentList aria-label="Список студентов">{visibleStudents.map(student => (
          <li key={student.id}>
            <StudentCard to={`/student/${encodeURIComponent(student.id)}`} aria-label={`Открыть профиль: ${student.full_name || "Имя не указано"}`}>
              <span className="student-name">{student.full_name || "Имя не указано"}</span>
              <span className="student-action" aria-hidden="true">Просмотреть</span>
            </StudentCard>
          </li>
        ))}</StudentList>}
    </Page>
  );
}
