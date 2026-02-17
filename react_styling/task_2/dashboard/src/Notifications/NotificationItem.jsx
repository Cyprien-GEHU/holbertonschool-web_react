import { PureComponent } from "react";

class NotificationItem extends PureComponent {
  handleclick = () => {
    const { id, markAsRead } = this.props;
    if (markAsRead) {
      markAsRead(id);
    }
  };

  render() {
    const { type = null, html = null, value = null } = this.props;
    const textColor = type === "default"
    ? "text-[var(--default-notification-item)]"
    : "text-[var(--urgent-notification-item)]";

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={textColor}
          dangerouslySetInnerHTML={
            typeof html === "object" ? html : { __html: html }
          }
          onClick={this.handleclick}
        />
      );
    }
    return (
      <li
        data-notification-type={type}
        className={textColor}
        onClick={this.handleclick}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
