import React from "react";

export const defaultUser = {
  email: "",
  password: "",
  isLoggedIn: false,
};

export const defaultLogOut = () => {};
export const defaultLogIn = () => {};

const AppContext = React.createContext({
  user: defaultUser,
  logIn: defaultLogIn,
  logOut: defaultLogOut,
});

export default AppContext;
