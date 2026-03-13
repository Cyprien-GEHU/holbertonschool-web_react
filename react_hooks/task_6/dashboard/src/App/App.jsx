import { useReducer, useCallback, useEffect } from "react";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import LoginWithLogging from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseListWithLogging from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import axios from "axios";
import { appReducer, initialState, APP_ACTIONS } from "./appReducer";

function App() {
  // use state part
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { notifications, courses, displayDrawer, user } = state;

  // Drawer display part
  const handleDisplayDrawer = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.TOGGLE_DRAWER,
      payload: true,
    });
  }, [dispatch]);

  const handleHideDrawer = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.TOGGLE_DRAWER,
      payload: false,
    });
  }, [dispatch]);

  //logIn part
  const logIn = useCallback((email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password },
    });
  }, [dispatch]);

  //logOut part
  const logOut = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.LOGOUT,
    });
  }, [dispatch]);

  // marknotification function
  const markNotificationAsRead = useCallback((id) => {
    dispatch({
      type: APP_ACTIONS.MARK_NOTIFICATION_READ,
      payload: id,
    });
  }, [dispatch]);

  // axios avec useEffect
  useEffect(() => {
    const NotifFetch = async () => {
      try {
        const res = await axios.get("/notifications.json");
        const notifHtml = res.data.map((notif) => {
          if (notif.id === 3)
            return { ...notif, html: { __html: getLatestNotification() } };
          return notif;
        });
        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: notifHtml,
        });
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to fetch notifications:", err);
        }
      }
    };
    NotifFetch();
  }, [dispatch]);

  useEffect(() => {
    if (user.isLoggedIn) {
      const fetchCourses = async () => {
        try {
          const res = await axios.get("/courses.json");
          dispatch({
            type: APP_ACTIONS.SET_COURSES,
            payload: res.data,
          });
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Failed to fetch courses:", error);
          }
        }
      };
      fetchCourses();
    } else {
      dispatch({
            type: APP_ACTIONS.SET_COURSES,
            payload: [],
          });
    }
  }, [dispatch, user]);

  return (
    <div className="relative px-3 min-h-screen flex flex-col">
      <div className="absolute top-0 right-0 z-10">
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
      </div>
      <div className="flex-1">
        <Header user={user} logOut={logOut}/>
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseListWithLogging courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <LoginWithLogging
              logIn={logIn}
            />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>
            ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Similique, asperiores architecto blanditiis fuga doloribus sit illum
            aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut
            magni dicta. Recusandae, quia dicta?{" "}
          </p>
        </BodySection>
      </div>
      <Footer user={user} isIndex={false}/>
    </div>
  );
}
export default App;
