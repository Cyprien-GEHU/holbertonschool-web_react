function NotificationItem({ type, html, value }) {
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
      />
    );
  }
  return (
    <li data-notification-type={type} style={htmlStyle}>
        {value}
    </li>
  )
}

export default NotificationItem;
