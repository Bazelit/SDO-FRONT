import { useQuery } from "react-query";
import { getGroups, getStudentsByGroup } from "../../api/teacher-api";

function readList({ data }) {
  if (!Array.isArray(data)) throw new Error("Ожидался список в ответе сервера");
  return data;
}

const options = { retry: false, refetchOnWindowFocus: false, staleTime: 60000 };

export function useTeacherGroups() {
  const token = localStorage.getItem("access_token");
  return useQuery(["teacher-groups", token], () => getGroups().then(readList), options);
}

export function useGroupStudents(groupId) {
  const token = localStorage.getItem("access_token");
  return useQuery(
    ["teacher-group-students", token, groupId],
    () => getStudentsByGroup(groupId).then(readList),
    { ...options, enabled: Boolean(groupId) },
  );
}
