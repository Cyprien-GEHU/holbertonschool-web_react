import './App.css'
import { Component } from 'react'
import Header from '../Header/Header.jsx'
import Notifications from '../Notifications/Notifications.jsx'
import Footer from '../Footer/Footer.jsx'
import Login from '../Login/Login.jsx'
import {getLatestNotification} from '../utils/utils.js'
import CourseList from '../CourseList/CourseList.jsx'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'
import BodySection from '../BodySection/BodySection.jsx'
import WithLogging from '../HOC/WithLogging.jsx'

class App extends Component {
  constructor(props) {
    super(props)
  };

  static defaultProps = {
    isLoggedIn: false,
    logOut: () => {}
  }

  componentDidMount() {
    document.addEventListener('keydown', this.logoutShortcutDetection);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.logoutShortcutDetection);
  }

  logoutShortcutDetection = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out')
      this.props.logOut()
    }
  }

  render() {
    const markup = { __html: getLatestNotification() };
    const notificationsList = [{
      id: 1,
      type: 'default',
      value: 'New course available'
    }, {
      id: 2,
      type: 'urgent',
      value: 'New course available'
    }, {
      id: 3,
      type: 'urgent',
      html: markup
    }]
    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]

    return (
      <>
        <div className='root-notifications'>
          <Notifications notifications={notificationsList} displayDrawer={true} />
        </div>
        <Header />
        <div className='main-body'>
          {this.props.isLoggedIn ? 
            <BodySectionWithMarginBottom title='Course list'>
              <CourseList courses={coursesList}/>
            </BodySectionWithMarginBottom>
            :
            <BodySectionWithMarginBottom title='Log in to continue'>
              <Login />
            </BodySectionWithMarginBottom>
          }
          <BodySection title='News from the School'>
            <p>Holberton School News goes here</p>
          </BodySection>
        </div>
        <Footer isIndex={true} />
      </>
    )
  }
};

export default App