import styles from "./styles.module.css";
import LogoText from "../../components/LogoText";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { useEffect, useState } from "react";

function Header(props) {
  const { search } = props;

  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage == null) {
      setUser(false);
    } else {
      setIsLoggedIn(true);
      setUser(JSON.parse(userStorage));
    }
  }, []);

  // Resets authenticated values in local storage
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link to="#">
          <div>
            <LogoText />
          </div>
        </Link>
        {search != null && search ? <SearchBar></SearchBar> : null}

        {isLoggedIn && user ? (
          <div>
            <div>{user.name}</div>
            <button onClick={logOut}>log out</button>
          </div>
        ) : (
          <div>
            <Icon name="menu"></Icon>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
