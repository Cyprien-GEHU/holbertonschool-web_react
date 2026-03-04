import WithLogging from "../HOC/WithLogging";
import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email || "",
      password: this.props.password || "",
      enableSubmit: false,
    };
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value }, this.validateForm);
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value }, this.validateForm);
  };

  handleLogInSubmit = (event) => {
    event.preventDefault();
    this.props.logIn(this.state.email, this.state.password)
  }

  validateForm = () => {
    const { email, password } = this.state;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enableSubmit = regexEmail.test(email) && password.length >= 8;
    this.setState({ enableSubmit});
  };

  render() {
    return (
      <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
        <p className="text-xl mb-4">Login to access the full dashboard</p>
        <form
          action=""
          className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
          onSubmit={this.handleLogInSubmit}
        >
          <label htmlFor="email" className="sm:pr-2">
            Email:
          </label>
          <input
            type="email"
            name="user_email"
            id="email"
            className="border rounded w-3/5 sm:w-auto px-2 py-1"
            onChange={this.handleChangeEmail}
            value={this.state.email}
          />
          <label htmlFor="password" className="sm:pl-2 sm:pr-2">
            Password:
          </label>
          <input
            type="password"
            name="user_password"
            id="password"
            className="border rounded w-3/5 sm:w-auto px-2 py-1"
            onChange={this.handleChangePassword}
            value={this.state.password}
          />
          <button
            className="cursor-pointer border px-1 rounded sm:ml-2 w-fit"
            type="submit"
            disabled={!this.state.enableSubmit}
          >
            OK
          </button>
        </form>
      </div>
    );
  }
}

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
