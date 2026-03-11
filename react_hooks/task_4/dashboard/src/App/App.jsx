import { useState, useCallback, useEffect } from "react";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import LoginWithLogging from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseListWithLogging from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import AppContext, { defaultUser } from "../Context/context";
import axios from "axios";

function App() {
  // use state part
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);

  // Drawer display part
  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  //logIn part
  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  //logOut part
  const logOut = useCallback(() => {
    setUser(defaultUser);
  }, []);

  // marknotification function
  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

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
        setNotifications(notifHtml);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to fetch notifications:", err);
        }
      }
    };
    NotifFetch();
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      const fetchCourses = async () => {
        try {
          const res = await axios.get("/courses.json");
          setCourses(res.data);
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Failed to fetch courses:", error);
          }
        }
      };
      fetchCourses();
    } else {
      setCourses([]);
    }
  }, [user]);

  const valueContext = { user, logOut };
  return (
    <AppContext.Provider value={valueContext}>
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
          <Header />
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging
                logIn={logIn}
                email={user.email}
                password={user.password}
              />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>
              ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique, asperiores architecto blanditiis fuga doloribus sit
              illum aliquid ea distinctio minus accusantium, impedit quo
              voluptatibus ut magni dicta. Recusandae, quia dicta?{" "}
            </p>
          </BodySection>
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}
export default App;
