import React, { useState } from "react";
import { useTeacherGroups } from "./useTeacherGroupData";
import { Page, PageTitle, GroupList as List } from "./GroupPages.styles";
import GroupWindow from "./components/GroupWindow";
import GroupBreadcrumbs from "./components/GroupBreadcrumbs";
import GroupSearch from "./components/GroupSearch";
import ListState from "./components/ListState";

export default function TeacherGroups() {
  const [search, setSearch] = useState("");
  const { data: groups = [], isLoading, isError, isFetching, refetch } = useTeacherGroups();
  const query = search.trim().toLocaleLowerCase("ru");
  const visibleGroups = groups.filter(group => String(group.name).toLocaleLowerCase("ru").includes(query));

  return (
    <Page>
      <PageTitle>Группы</PageTitle>
      <GroupBreadcrumbs />
      <GroupSearch label="Номер группы" value={search} onChange={setSearch} />
      {isLoading || (isFetching && isError) ? <ListState message="Загрузка групп..." />
        : isError ? <ListState error message="Не удалось загрузить группы." onRetry={refetch} />
        : groups.length === 0 ? <ListState message="Группы не найдены" />
        : visibleGroups.length === 0 ? <ListState message="Группы не найдены по вашему запросу" />
        : <List aria-label="Список групп">{visibleGroups.map((group, index) => (
          <li key={group.id}><GroupWindow groupId={group.id} groupNumber={group.name} alternate={index % 2 === 1} /></li>
        ))}</List>}
    </Page>
  );
}
