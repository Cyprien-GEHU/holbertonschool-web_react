import holbertonLogo from "../assets/holberton-logo.jpg";
import {useContext} from "react";
import AppContext from "../Context/context";

function Header() {
    const { user, logOut } = useContext(AppContext)
    return (
      <>
        <header className="App-heade flex items-center py-2 max-[520px]:flex-col">
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
            welcome <span className="font-bold">{user.email}</span>{" "}
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
