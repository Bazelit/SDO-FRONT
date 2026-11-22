import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Footer from "./Footer/Footer";
import FooterMobile from "./Footer/FooterMobile";

function Controls({ loggedIn }) {
  const { theme } = useTheme();
  return <>
    <output aria-label="Theme">{theme}</output>
    <FooterMobile isLoggedIn={loggedIn} />
    <Footer />
    <Link to="/LaboratoryAdd">Add laboratory</Link>
    <Link to="/login">Login</Link>
    <Link to="/PersonalStud">Student profile</Link>
  </>;
}

function mount(path = "/", loggedIn = false) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider><Controls loggedIn={loggedIn} /></ThemeProvider>
    </MemoryRouter>
  );
}

function toggle() {
  fireEvent.click(within(screen.getByRole("contentinfo")).getByRole("button"));
}

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => jest.restoreAllMocks());

test("switches from the footer and restores the saved theme after remount", () => {
  const first = mount();
  expect(screen.getByLabelText("Theme").textContent).toBe("light");
  toggle();
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem("site-theme")).toBe("dark");
  expect(within(screen.getByRole("contentinfo")).getByRole("button").getAttribute("aria-pressed")).toBe("true");
  first.unmount();
  mount();
  expect(screen.getByLabelText("Theme").textContent).toBe("dark");
  toggle();
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("site-theme")).toBe("light");
});

test.each([
  ["/", null], ["/login", null], ["/registration", null],
  ["/PersonalStud", "student"], ["/StudLaboratory", "student"],
  ["/disciplinesStud", "student"], ["/LabaStud/1", "student"],
  ["/attempts", "student"], ["/testLabs", "student"],
  ["/PersonalTeacher", "teacher"], ["/disciplines", "teacher"],
  ["/Laboratory/1", "teacher"], ["/LaboratoryAdd", "teacher"],
  ["/PrepodRedLab/1", "teacher"], ["/groups/1", "teacher"],
  ["/student/1", "teacher"], ["/checkLaboratory", "teacher"],
  ["/checklabteacher/1", "teacher"], ["/seeresultstudent/1/1", "teacher"],
])("applies the shared theme on %s for %s", (path, role) => {
  localStorage.setItem("site-theme", "dark");
  if (role) localStorage.setItem("status", role);
  mount(path, !!role);
  expect(document.documentElement.dataset.theme).toBe("dark");
  toggle();
  expect(document.documentElement.dataset.theme).toBe("light");
});

test("keeps the chosen theme across public, student and teacher routes", () => {
  mount();
  toggle();
  for (const name of ["Student profile", "Add laboratory", "Login"]) {
    fireEvent.click(screen.getByText(name));
    expect(document.documentElement.dataset.theme).toBe("dark");
  }
});

test("migrates the previous teacher preference and respects a newer site preference", () => {
  localStorage.setItem("teacher-theme", "dark");
  const first = mount();
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem("site-theme")).toBe("dark");
  toggle();
  first.unmount();
  mount();
  expect(document.documentElement.dataset.theme).toBe("light");
});

test("syncs another tab, including a cleared preference", () => {
  mount();
  act(() => {
    localStorage.setItem("site-theme", "dark");
    window.dispatchEvent(new StorageEvent("storage", { key: "site-theme" }));
  });
  expect(document.documentElement.dataset.theme).toBe("dark");
  act(() => {
    localStorage.clear();
    window.dispatchEvent(new StorageEvent("storage", { key: null }));
  });
  expect(document.documentElement.dataset.theme).toBe("light");
});

test("still switches when browser storage is blocked", () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Blocked"); });
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Blocked"); });
  mount();
  toggle();
  expect(document.documentElement.dataset.theme).toBe("dark");
  toggle();
  expect(document.documentElement.dataset.theme).toBe("light");
});

test("falls back to light for an invalid saved preference", () => {
  localStorage.setItem("site-theme", "invalid");
  mount();
  expect(document.documentElement.dataset.theme).toBe("light");
});

test.each(["student", "teacher"])("retains all mobile labels and icons for %s in both themes", role => {
  localStorage.setItem("status", role);
  const view = mount(role === "student" ? "/PersonalStud" : "/PersonalTeacher", true);
  const nav = screen.getByRole("navigation", { hidden: true });
  for (let i = 0; i < 2; i++) {
    toggle();
    const links = within(nav).getAllByRole("link", { hidden: true });
    expect(links).toHaveLength(3);
    links.forEach(link => {
      expect(link.textContent.trim().length).toBeGreaterThan(0);
      expect(link.querySelector("img").getAttribute("src")).toBeTruthy();
    });
  }
  expect(document.body.classList.contains("has-mobile-nav")).toBe(true);
  view.unmount();
  expect(document.body.classList.contains("has-mobile-nav")).toBe(false);
});

test("keeps the footer toggle when the viewport changes", () => {
  mount();
  toggle();
  for (const width of [375, 600, 601, 1440]) {
    act(() => {
      window.innerWidth = width;
      window.dispatchEvent(new Event("resize"));
    });
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(within(screen.getByRole("contentinfo")).getByRole("button").getAttribute("aria-pressed")).toBe("true");
  }
});
