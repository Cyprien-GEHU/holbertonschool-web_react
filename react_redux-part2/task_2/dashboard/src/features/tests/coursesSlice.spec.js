import { configureStore } from "@reduxjs/toolkit";
import mockAxios from "jest-mock-axios";
import coursesReducer, { fetchCourses } from "../courses/coursesSlice";
import { logout } from "../auth/authSlice";

afterEach(() => {
  mockAxios.reset();
});

describe("all test for coursesSlice", () => {
  const initialState = {
    courses: [],
  };

  it("render the correct initial state by default", () => {
    expect(coursesReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("render the fetches correctly the courses data", async () => {
    const mockCourses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
      { id: 4, name: "Redux", credit: 90 },
    ];

    const store = configureStore({ reducer: coursesReducer });
    const promise = store.dispatch(fetchCourses());

    mockAxios.mockResponse({ data: { courses: mockCourses } });

    await promise;

    const stateStore = store.getState();
    expect(stateStore.courses).toHaveLength(4);
    expect(stateStore.courses[0]).toEqual({ ...mockCourses[0], "isSelected": false});
    expect(stateStore.courses[1]).toEqual({ ...mockCourses[1], "isSelected": false});
    expect(stateStore.courses[2]).toEqual({ ...mockCourses[2], "isSelected": false});
    expect(stateStore.courses[3]).toEqual({ ...mockCourses[3],"isSelected": false});
  });

  it("render a resets the courses array to empty whenever the logout action is dispatched", () => {
    const courses = {
      courses: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
        { id: 4, name: "Redux", credit: 90 },
      ],
    };

    const state = coursesReducer(courses, logout());
    expect(state).toEqual(initialState);
    expect(state.courses).toHaveLength(0);
  });
});
