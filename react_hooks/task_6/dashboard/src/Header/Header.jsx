import holbertonLogo from "../assets/holberton-logo.jpg";

function Header({ user, logOut }) {
    return (
      <>
        <header className="App-header flex items-center py-2 max-[520px]:flex-col">
          <img
            className="App-logo h-60 pointer-events-none max-[520px]:h-60"
            src={holbertonLogo}
            alt="holberton logo"
          />
          <h1 className="font-bold text-[color:var(--main-color)] text-5xl max-[520px]:text-5xl max-[520px]:mt-2 max-[435px]:text-4xl">
            School dashboard
          </h1>
        </header>
        {user.isLoggedIn && (
          <section id="logoutSection" className="ml-auto">
            Welcome <span className="font-bold">{user.email}</span>{" "}
            <a className="italic" href="#" onClick={(event) => {
              event.preventDefault();
              logOut();
            }}>
              (logOut)
            </a>
          </section>
        )}
      </>
    );

}

export default Header;
