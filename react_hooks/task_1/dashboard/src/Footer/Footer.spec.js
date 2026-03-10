import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { getFooterCopy, getCurrentYear } from "../utils/utils";
import AppContext from "../Context/context";

test("renders a p element string Copyright {the current year} - Holberton School, whenever the getFooterCopy() “isIndex” argument is set to true", () => {
  render(<Footer isIndex={true} />);

  const currentYear = getCurrentYear();
  const footerCopy = getFooterCopy(true);
  expect(
    screen.getByText(
      new RegExp(`copyright ${currentYear} - ${footerCopy}`, "i"),
    ),
  ).toBeInTheDocument();
});

test("sould not display 'conctats us' when the user is logged out", () => {
  const context = {
    user: { email: "", password: "", isLoggedIn: false },
    logOut: () => {},
  };
  render(
    <AppContext.Provider value={context}>
      <Footer />
    </AppContext.Provider>,
  );
  expect(screen.queryByText("Contact us")).not.toBeInTheDocument();
});

test("render 'contact us' when the user are logged in", () => {
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
      <Footer />
    </AppContext.Provider>,
  );
  expect(screen.getByText("Contact us")).toBeInTheDocument();
  expect(screen.getByText("Contact us").closest("a")).toBeInTheDocument();
});
