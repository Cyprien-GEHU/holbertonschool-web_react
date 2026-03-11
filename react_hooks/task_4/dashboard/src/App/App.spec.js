import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App.jsx";

let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, "log").mockImplementation();
});

afterEach(() => {
  consoleSpy.mockRestore();
});

test("renders login and copyright paragraph with the correct content", async () => {
  render(<App isLoggedIn={false} />);
  expect(
    screen.getByText(/^login to access the full dashboard$/i),
  ).toBeInTheDocument();
  expect(screen.getByText(/^copyright/i)).toBeInTheDocument();
});

test("renders Email and Password label element", async () => {
  render(<App isLoggedIn={false} />);
  expect(screen.getByText(/email/i)).toBeInTheDocument();
  expect(screen.getByText(/password/i)).toBeInTheDocument();
});

test("renders the Login component when isLoggedIn is false", () => {
  render(<App isLoggedIn={false} />);
  expect(
    screen.getByText(/^login to access the full dashboard$/i),
  ).toBeInTheDocument();
});


test("check that a title with the text News from the School, and a paragraph element with the text Holberton School News goes here are displayed by default in the App component", () => {
  render(<App />);
  const bodySectionTitle = screen.getByText(/news from the school/i);
  const bodySectionParagraph = screen.getByText(
    /ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?/i,
  );

  expect(bodySectionTitle).toBeInTheDocument();
  expect(bodySectionParagraph).toBeInTheDocument();
});

test("render the message notification and remove the notification when we click on a notificaztion", () => {
  const logspy = jest.spyOn(console, "log").mockImplementation(() => {});
  render(<App />);

  const titleNotification = screen.getByText(/Your notification/i);
  fireEvent.click(titleNotification);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(3);

  fireEvent.click(listItems[2])

  expect(logspy).toHaveBeenCalledWith('Notification 3 has been marked as read');
  fireEvent.click(titleNotification);
  const TwoItems = screen.getAllByRole('listitem');
  expect(TwoItems).toHaveLength(2);
  logspy.mockRestore();
});
