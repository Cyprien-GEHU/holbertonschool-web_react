import mockAxios from "jest-mock-axios";
import axios from "axios";
import authReducer, { login, logout } from "../auth/authSlice";

afterEach(() => {
  mockAxios.reset();
});

describe("all test for authSlice", () => {
  const initialState = {
    user: {
      email: "",
      password: "",
    },
    isLoggedIn: false,
  };

  it("rend the correct inital state by default", () => {
    expect(authReducer(undefined, { type: "unkown" })).toEqual(initialState);
  });

  it("render the state correctly when the login action is dispatched", async () => {
    const credentials = { email: "iamtest@test.com", password: "password1920" };

    const request = axios.post("/login", credentials);

    mockAxios.mockResponse({ data: credentials });

    const reponse = await request;
    const state = authReducer(initialState, login(reponse.data));
    expect(state.user.email).toBe(credentials.email);
    expect(state.user.password).toBe(credentials.password);
    expect(state.isLoggedIn).toBe(true);
  });

  it("render a Resets the state correctly when the logout action is dispatched", async () => {
    const logState = {
      user: {
        email: "iamtest@test.com",
        password: "password1920",
      },
      isLoggedIn: true,
    };

    const request = axios.post("/logout");
    mockAxios.mockResponse({ data: {} });

    await request;
    const state = authReducer(logState, logout());

    expect(state.user.email).toBe("");
    expect(state.user.password).toBe("");
    expect(state.isLoggedIn).toBe(false);
  });
});
