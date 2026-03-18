import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coursesReducers from "../features/courses/coursesSlice";
import notificationReducers from "../features/notifications/notificationsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    notifications: notificationReducers,
    courses: coursesReducers
});

export default rootReducer;