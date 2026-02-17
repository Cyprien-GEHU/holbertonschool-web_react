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
    const htmlStyle = {
      color: type === "urgent" ? "red" : "blue",
    };

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={htmlStyle}
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
        style={htmlStyle}
        onClick={this.handleclick}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
