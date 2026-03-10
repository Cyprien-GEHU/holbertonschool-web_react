import WithLogging from "../HOC/WithLogging";
import { useState } from "react";

function Login({ logIn }) {
  //all user data get by input
  const [formData, setFormData] = useState({ email: "", password: "" });

  // controle submit control part
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleChangeEmail = (event) => {
    const email = event.target.value;

    setFormData((prev) => {
      const update = { ...prev, email };
      validateForm(update.email, update.password);
      return update;
    });
  };

  const handleChangePassword = (event) => {
    const password = event.target.value;

    setFormData((prev) => {
      const update = { ...prev, password };
      validateForm(update.email, update.password);
      return update;
    });
  };

  const handleLogInSubmit = (event) => {
    event.preventDefault();
    logIn(formData.email, formData.password);
  };

  const validateForm = (email, password ) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enableSubmit = regexEmail.test(email) && password.length >= 8;
    setEnableSubmit(enableSubmit );
  };

  return (
    <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
      <p className="text-xl mb-4">Login to access the full dashboard</p>
      <form
        action=""
        className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
        onSubmit={handleLogInSubmit}
      >
        <label htmlFor="email" className="sm:pr-2">
          Email:
        </label>
        <input
          type="email"
          name="user_email"
          id="email"
          className="border rounded w-3/5 sm:w-auto px-2 py-1"
          onChange={handleChangeEmail}
          value={formData.email}
        />
        <label htmlFor="password" className="sm:pl-2 sm:pr-2">
          Password:
        </label>
        <input
          type="password"
          name="user_password"
          id="password"
          className="border rounded w-3/5 sm:w-auto px-2 py-1"
          onChange={handleChangePassword}
          value={formData.password}
        />
        <button
          className="cursor-pointer border px-1 rounded sm:ml-2 w-fit"
          type="submit"
          disabled={!enableSubmit}
        >
          OK
        </button>
      </form>
    </div>
  );
}

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
