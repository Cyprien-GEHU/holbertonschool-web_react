import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import AppContext from "../Context/context";

test("renders the Holberton logo in the header component ", () => {
  render(<Header />);
  expect(screen.getByAltText(/^holberton logo$/i)).toBeInTheDocument();
});

test("renders the h1 element with correct text", () => {
  render(<Header />);
  expect(
    screen.getByRole("heading", { level: 1, name: /^school dashboard$/i }),
  ).toBeInTheDocument();
});

describe("all test with header log section", () => {
  test("not render the logoutSection", () => {
    render(<Header />);
    expect(screen.queryByText(/Welcome/i)).not.toBeInTheDocument();
    expect(document.getElementById("logoutSection")).toBeNull();
  });

  test("render logoutSection with context", () => {
    const context = {
      user: {
        email: "jesuisuntest@try.com",
        password: "iampassword1920",
        isLoggedIn: true,
      },
      logOut: () => {},
    };

    render(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>,
    );
    expect(document.getElementById("logoutSection")).toBeInTheDocument();
    expect(screen.getByText(/jesuisuntest@try.com/i)).toBeInTheDocument();
  });

  test("render the logout spy when the logout have been clicked", () => {
    const logOutSpy = jest.fn();
    const context = {
      user: {
        email: "jesuisuntest@try.com",
        password: "iampassword1920",
        isLoggedIn: true,
      },
      logOut: logOutSpy,
    };

    render(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>,
    );
    fireEvent.click(screen.getByText(/\(logout\)/i));
    expect(logOutSpy).toHaveBeenCalled();
  });
});
