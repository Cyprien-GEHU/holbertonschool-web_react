import NotificationItem from "./NotificationItem";
import { render, screen } from "@testing-library/react";

test('render all li blue with type default', () => {
    render(<NotificationItem type="default" value="New course available" />);
    const li = screen.getByRole('listitem');
    expect(li).toHaveStyle({color: "blue"});
    expect(li).toHaveAttribute('data-notification-type', "default");
});

test('render all li red with type urgent', () => {
    render(<NotificationItem type="urgent" value="New resume available" />);
    const li = screen.getByRole('listitem');
    expect(li).toHaveStyle({color: "red"});
    expect(li).toHaveAttribute('data-notification-type', "urgent");
});