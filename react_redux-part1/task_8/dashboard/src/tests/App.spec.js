import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "../App";
import rootReducer from "../app/rootReducer";
import mockAxios from "jest-mock-axios";
import * as coursesSlice from "../features/courses/coursesSlice";

afterEach(() => {
  mockAxios.reset();
});

function renderWithStore(preloadedState = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

test("App renders Login when isLoggedIn is false", () => {
  renderWithStore({
    auth: { user: { email: "", password: "" }, isLoggedIn: false },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /log in to continue/i }),
  ).toBeInTheDocument();
});

test("fetchNotifications is dispatched on mount and notification items are displayed", async () => {
  renderWithStore({
    auth: { user: { email: "", password: "" }, isLoggedIn: false },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  expect(mockAxios.get).toHaveBeenCalledWith(
    "http://localhost:5173/notifications.json",
  );

  mockAxios.mockResponse({
    data: {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
      ],
    },
  });

  await waitFor(() => {
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
  });
});

test("App renders CourseList when isLoggedIn is true", () => {
  renderWithStore({
    auth: {
      user: { email: "test@test.com", password: "pass" },
      isLoggedIn: true,
    },
    notifications: { notifications: [], displayDrawer: false },
    courses: { courses: [] },
  });

  // Vérifie que la section Course list est affichée
  expect(screen.getByText(/Course list/i)).toBeInTheDocument();
});

test("App fetches courses only when isLoggedIn is true", () => {
  const fetchCoursesSpy = jest.spyOn(coursesSlice, "fetchCourses");

  renderWithStore({
    auth: {
      user: null,
      isLoggedIn: false,
    },
    notifications: { notifications: [], displayDrawer: false },
    courses: { courses: [] },
  });

  expect(fetchCoursesSpy).not.toHaveBeenCalled();

  fetchCoursesSpy.mockClear();

  renderWithStore({
    auth: {
      user: { email: "test@test.com", password: "pass" },
      isLoggedIn: true,
    },
    notifications: { notifications: [], displayDrawer: false },
    courses: { courses: [] },
  });

  expect(fetchCoursesSpy).toHaveBeenCalled();
});