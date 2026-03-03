import React from "react";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import LoginWithLogging from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseListWithLogging from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";

class App extends React.Component {
  static defaultProps = {
    isLoggedIn: true,
    logOut: () => {},
  };
  constructor(props) {
    super(props);

    this.state = {
      notificationsList: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      coursesList: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
      displayDrawer: true,
    };
  }

  handleLogout = (event) => {
    if (event.ctrlKey && event.key === "h") {
      alert("Logging you out");
      this.props.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleLogout);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleLogout);
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  render() {
    const { isLoggedIn = false } = this.props;
    const { notificationsList, coursesList, displayDrawer } = this.state;

    return (
      <>
        <div className="relative px-3 min-h-screen flex flex-col">
          <div className="absolute top-0 right-0 z-10">
            <Notifications
              notifications={notificationsList}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
          </div>
          <div className="flex-1">
            <Header />
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseListWithLogging courses={coursesList} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <LoginWithLogging />
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
      </>
    );
  }
}
export default App;
