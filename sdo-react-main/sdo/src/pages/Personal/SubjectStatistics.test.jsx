import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubjectStatistics from "./SubjectStatistics";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("SubjectStatistics", () => {
  test("shows loading and then renders subject completion data", async () => {
    let resolveStatistics;
    const loadStatistics = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveStatistics = resolve;
        }),
    );

    render(<SubjectStatistics loadStatistics={loadStatistics} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Загрузка статистики...",
    );

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      resolveStatistics([
        {
          subjectId: 7,
          subjectName: "Математика",
          completedTasks: 3,
          totalTasks: 4,
        },
      ]);
    });

    expect(screen.getByText("Математика")).toBeInTheDocument();
    expect(screen.getByText("3/4")).toBeInTheDocument();
    expect(screen.getAllByText("75%")).toHaveLength(2);
    expect(
      screen.getByRole("progressbar", {
        name: "Выполнение по предмету Математика",
      }),
    ).toHaveAttribute("value", "75");
  });

  test("shows the empty state when the API returns no subject statistics", async () => {
    render(<SubjectStatistics loadStatistics={() => Promise.resolve([])} />);

    expect(
      await screen.findByText("Статистика по предметам пока отсутствует."),
    ).toBeInTheDocument();
  });

  test("shows an error and retry action when loading fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <SubjectStatistics
        loadStatistics={() => Promise.reject(new Error("Request failed"))}
      />,
    );

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Не удалось загрузить статистику по предметам.");
    expect(screen.getByRole("button", { name: "Повторить" })).toBeInTheDocument();
  });

  test("shows subjects with no tasks without dividing by zero", async () => {
    render(
      <SubjectStatistics
        loadStatistics={() =>
          Promise.resolve([
            {
              subjectId: "empty",
              subjectName: "Физика",
              completedTasks: 0,
              totalTasks: 0,
            },
          ])
        }
      />,
    );

    expect(await screen.findByText("Нет заданий")).toBeInTheDocument();
    expect(screen.getAllByText("0%")).toHaveLength(2);
  });
});
