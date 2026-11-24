import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import MainRouter from "../../app/routing";
import { ThemeProvider } from "../../components/ThemeContext";
import { getGroups, getSubjects, getStudentsByGroup } from "../../api/teacher-api";
import { getUserData } from "../../api/user-api";

jest.mock("../../api/teacher-api");
jest.mock("../../api/user-api");
jest.mock("../StudentPage/StudentPage", () => function StudentProfile() {
  const { id } = jest.requireActual("react-router-dom").useParams();
  return <h1>Профиль студента {id}</h1>;
});

const groups = [{ id: 10, name: "221-375" }, { id: 20, name: "221-376" }];
const students = [
  { id: 43, full_name: "Иванов Иван Иванович", studyGroup: "221-376" },
  { id: 44, full_name: "Петров Пётр Петрович", studyGroup: "221-376" },
];
let queryClient;

function mount(path = "/PersonalTeacher") {
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider>
          <MainRouter setIsLoggedIn={() => {}} />
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

beforeAll(() => { setLogger({ log: () => {}, warn: () => {}, error: () => {} }); });
afterAll(() => { setLogger(console); });

beforeEach(() => {
  jest.clearAllMocks();
  window.scrollTo = jest.fn();
  localStorage.clear();
  localStorage.setItem("access_token", "test-token");
  localStorage.setItem("role", "teacher");
  localStorage.setItem("status", "teacher");
  getGroups.mockResolvedValue({ data: groups });
  getSubjects.mockResolvedValue({ data: [] });
  getStudentsByGroup.mockResolvedValue({ data: students });
  getUserData.mockResolvedValue({ data: { first_name: "Анна", last_name: "Иванова", faculty: "ИТ" } });
});

afterEach(() => { cleanup(); queryClient?.clear(); });

test("navigates from the teacher account through groups to a student profile, with both searches", async () => {
  mount();
  await screen.findByText("Иванова Анна");
  fireEvent.click(screen.getByRole("link", { name: "Обучающиеся студенты" }));
  await screen.findByRole("link", { name: "Перейти к группе 221-376" });
  fireEvent.change(screen.getByRole("textbox", { name: "Номер группы" }), { target: { value: " 376 " } });
  expect(screen.queryByRole("link", { name: "Перейти к группе 221-375" })).toBeNull();
  fireEvent.click(screen.getByRole("link", { name: "Перейти к группе 221-376" }));
  await screen.findByRole("link", { name: "Открыть профиль: Иванов Иван Иванович" });
  expect(getStudentsByGroup).toHaveBeenCalledWith("20");
  expect(screen.getByRole("heading", { name: "Студенты группы 221-376" })).toBeTruthy();
  fireEvent.change(screen.getByRole("textbox", { name: "ФИО студента" }), { target: { value: " ИВАНОВ " } });
  expect(screen.queryByText("Петров Пётр Петрович")).toBeNull();
  fireEvent.click(screen.getByRole("link", { name: "Открыть профиль: Иванов Иван Иванович" }));
  expect(screen.getByRole("heading", { name: "Профиль студента 43" })).toBeTruthy();
});

test("opens a group by a direct URL and shows its name even when there are no students", async () => {
  getStudentsByGroup.mockResolvedValue({ data: [] });
  mount("/groups/20");
  expect(await screen.findByText("Студенты не найдены")).toBeTruthy();
  expect(await screen.findByRole("heading", { name: "Студенты группы 221-376" })).toBeTruthy();
});

test("shows a group loading error separately from an empty list and allows retry", async () => {
  getGroups.mockRejectedValueOnce(new Error("Offline"));
  mount("/groups");
  expect(await screen.findByRole("alert")).toBeTruthy();
  expect(screen.queryByText("Группы не найдены")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Повторить загрузку" }));
  expect(await screen.findByRole("link", { name: "Перейти к группе 221-375" })).toBeTruthy();
  expect(getGroups).toHaveBeenCalledTimes(2);
});

test("distinguishes an empty groups response from no search matches", async () => {
  mount("/groups");
  await screen.findByRole("list", { name: "Список групп" });
  fireEvent.change(screen.getByRole("textbox", { name: "Номер группы" }), { target: { value: "999" } });
  expect(screen.getByText("Группы не найдены по вашему запросу")).toBeTruthy();
  cleanup(); queryClient.clear();
  getGroups.mockResolvedValue({ data: [] });
  mount("/groups");
  expect(await screen.findByText("Группы не найдены")).toBeTruthy();
  expect(screen.queryByRole("alert")).toBeNull();
});

test("retries the students request for the selected group", async () => {
  getStudentsByGroup.mockRejectedValueOnce(new Error("Offline"));
  mount("/groups/20");
  expect(await screen.findByText("Не удалось загрузить студентов группы.")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Повторить загрузку" }));
  expect(await screen.findByText("Петров Пётр Петрович")).toBeTruthy();
  expect(getStudentsByGroup).toHaveBeenNthCalledWith(1, "20");
  expect(getStudentsByGroup).toHaveBeenNthCalledWith(2, "20");
});

test("shows no student matches and provides links back to groups and the teacher account", async () => {
  mount("/groups/20");
  await screen.findByText("Иванов Иван Иванович");
  fireEvent.change(screen.getByRole("textbox", { name: "ФИО студента" }), { target: { value: "Нет такого имени" } });
  expect(screen.getByText("Студенты не найдены по вашему запросу")).toBeTruthy();
  fireEvent.click(within(screen.getByRole("navigation", { name: "Навигация по группам" })).getByRole("link", { name: "Группы" }));
  await screen.findByRole("list", { name: "Список групп" });
  fireEvent.click(screen.getByRole("link", { name: "Личный кабинет" }));
  await screen.findByText("Иванова Анна");
  expect(screen.getByRole("link", { name: "Обучающиеся студенты" })).toBeTruthy();
});

test("keeps the teacher dark theme on both group pages", async () => {
  localStorage.setItem("teacher-theme", "dark");
  mount("/groups");
  fireEvent.click(await screen.findByRole("link", { name: "Перейти к группе 221-376" }));
  await screen.findByRole("list", { name: "Список студентов" });
  expect(document.documentElement.dataset.theme).toBe("dark");
});

test("reports a malformed groups response instead of crashing", async () => {
  getGroups.mockResolvedValueOnce({ data: { unexpected: true } });
  mount("/groups");
  expect(await screen.findByText("Не удалось загрузить группы.")).toBeTruthy();
});

test("keeps students available when the groups lookup fails and uses the response group name", async () => {
  getGroups.mockRejectedValueOnce(new Error("Offline"));
  mount("/groups/20");
  expect(await screen.findByText("Иванов Иван Иванович")).toBeTruthy();
  expect(screen.getByRole("heading", { name: "Студенты группы 221-376" })).toBeTruthy();
  expect(screen.queryByRole("alert")).toBeNull();
});

test("ignores a late response for a group that has already been left", async () => {
  let resolveFirst;
  getStudentsByGroup.mockImplementation(id => id === "10"
    ? new Promise(resolve => { resolveFirst = resolve; })
    : Promise.resolve({ data: students }));
  mount("/groups/10");
  expect(screen.getByText("Загрузка студентов...")).toBeTruthy();
  fireEvent.click(within(screen.getByRole("navigation", { name: "Навигация по группам" })).getByRole("link", { name: "Группы" }));
  fireEvent.click(await screen.findByRole("link", { name: "Перейти к группе 221-376" }));
  await screen.findByText("Иванов Иван Иванович");
  await act(async () => { resolveFirst({ data: [{ id: 99, full_name: "Студент другой группы" }] }); });
  await waitFor(() => expect(screen.queryByText("Студент другой группы")).toBeNull());
});

test.each(["/groups", "/groups/20"])("restricts %s to a teacher", async path => {
  localStorage.setItem("role", "student");
  mount(path);
  expect(await screen.findByRole("heading", { name: "Добро пожаловать на портал лабораторных работ" })).toBeTruthy();
  expect(getGroups).not.toHaveBeenCalled();
  expect(getStudentsByGroup).not.toHaveBeenCalled();
});
