import { getLatestNotification } from "../utils/utils";
import "./Notifications.css";
import closeButton from "../assets/close-button.png";

function Notifications() {
  function closeClick() {
    console.log("Close button has been clicked");
  }
  return (
    <>
      <div className="root-notifications">
        <div className="notification-items">
          <p>Here is the list of notifications</p>
          <ul>
            <li data-priority="default">New course available</li>
            <li data-priority="urgent">New resume available</li>
            <li
              data-priority="urgent"
              dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
            ></li>
          </ul>
          <button aria-label="Close" onClick={closeClick}>
            <img
              src={closeButton}
              alt="close button"
              width="12px"
              height="12px"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Notifications;
