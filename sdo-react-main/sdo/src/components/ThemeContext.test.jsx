import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Link } from "react-router-dom";
import { TeacherThemeProvider, useTeacherTheme } from "./ThemeContext";
import Footer from "./Footer/Footer";

function Controls() {
  const { theme } = useTeacherTheme();
  return <>
    <output aria-label="Тема">{theme}</output>
    <Footer />
    <Link to="/LaboratoryAdd">Создать лабораторную</Link>
    <Link to="/login">Авторизация</Link>
  </>;
}

function mount(path = "/PersonalTeacher", isLoggedIn = true) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <TeacherThemeProvider isLoggedIn={isLoggedIn}><Controls /></TeacherThemeProvider>
    </MemoryRouter>
  );
}

let viewport;
let viewportListeners;

function resizeTo(width) {
  act(() => {
    viewport.matches = width > 600;
    viewportListeners.forEach(listener => listener({ matches: viewport.matches }));
  });
}

beforeEach(() => {
  viewportListeners = new Set();
  viewport = {
    matches: true,
    addEventListener: (event, listener) => viewportListeners.add(listener),
    removeEventListener: (event, listener) => viewportListeners.delete(listener),
  };
  window.matchMedia = jest.fn(() => viewport);
  localStorage.clear();
  localStorage.setItem("role", "teacher");
});

test("switches both ways and restores the saved theme after remount", () => {
  const first = mount();
  fireEvent.click(screen.getByRole("button", { name: /Включить .* тему/ }));
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
  expect(localStorage.getItem("teacher-theme")).toBe("dark");
  first.unmount();
  mount();
  expect(screen.getByLabelText("Тема").textContent).toBe("dark");
  fireEvent.click(screen.getByRole("button", { name: /Включить .* тему/ }));
  expect(document.documentElement.dataset.teacherTheme).toBeUndefined();
  expect(localStorage.getItem("teacher-theme")).toBe("light");
});

test("keeps dark mode between teacher pages and resets it on the login page", () => {
  localStorage.setItem("teacher-theme", "dark");
  mount("/Disciplines");
  fireEvent.click(screen.getByText("Создать лабораторную"));
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
  fireEvent.click(screen.getByText("Авторизация"));
  expect(document.documentElement.dataset.teacherTheme).toBeUndefined();
  expect(screen.queryByRole("button", { name: /Включить .* тему/ })).toBeNull();
});

test.each([
  "/PersonalTeacher", "/disciplines", "/Laboratory/1", "/LaboratoryAdd",
  "/PrepodRedLab/1", "/groups/1", "/student/1", "/checkLaboratory",
  "/checklabteacher/1", "/seeresultstudent/1/1",
])("applies the saved theme to %s", (path) => {
  localStorage.setItem("teacher-theme", "dark");
  mount(path);
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
});

test("does not apply a teacher preference to a student or a signed-out session", () => {
  localStorage.setItem("teacher-theme", "dark");
  localStorage.setItem("role", "student");
  const student = mount("/PersonalStud");
  expect(document.documentElement.dataset.teacherTheme).toBeUndefined();
  expect(screen.queryByRole("button", { name: /Включить .* тему/ })).toBeNull();
  student.unmount();
  localStorage.setItem("role", "teacher");
  mount("/PersonalTeacher", false);
  expect(document.documentElement.dataset.teacherTheme).toBeUndefined();
});

test("syncs changes from another tab and clears dark mode on unmount", () => {
  const view = mount();
  act(() => {
    localStorage.setItem("teacher-theme", "dark");
    window.dispatchEvent(new StorageEvent("storage", { key: "teacher-theme" }));
  });
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
  view.unmount();
  expect(document.documentElement.dataset.teacherTheme).toBeUndefined();
});

test("restores a saved dark preference on mobile and switches from the footer", () => {
  localStorage.setItem("teacher-theme", "dark");
  resizeTo(375);
  mount();
  expect(screen.getByLabelText("Тема").textContent).toBe("dark");
  const button = screen.getByRole("button", { name: "Включить светлую тему" });
  expect(button.parentElement.textContent).toContain("Все права защищены");
  fireEvent.click(button);
  expect(document.documentElement.dataset.teacherTheme).toBeUndefined();
  expect(localStorage.getItem("teacher-theme")).toBe("light");
  fireEvent.click(screen.getByRole("button", { name: "Включить тёмную тему" }));
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
});

test("preserves the selected theme across mobile and desktop widths", () => {
  localStorage.setItem("teacher-theme", "dark");
  mount();
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
  resizeTo(600);
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
  expect(screen.getByRole("button", { name: "Включить светлую тему" })).not.toBeNull();
  resizeTo(601);
  expect(document.documentElement.dataset.teacherTheme).toBe("dark");
  expect(screen.queryByRole("button", { name: /Включить .* тему/ })).not.toBeNull();
});
