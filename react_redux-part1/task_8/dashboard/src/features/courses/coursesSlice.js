import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../auth/authSlice";

const initialState = {
  courses: [],
};

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const res = await axios.get(ENDPOINTS.courses);
    const data = res.data.courses || res.data;
    const dataCourses = data.map((course) => {
      return course;
    });
    return dataCourses;
  },
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        return state;
      })
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export default coursesSlice.reducer;
