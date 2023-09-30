import styles from "./styles.module.css";
import LogoText from "../../components/LogoText";
import Icon from "../../components/Icon";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import { useEffect, useState } from "react";
import Avatar from "../Avatar";

function Header(props) {
  const navigate = useNavigate();
  const { search, updatedUser } = props;

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
  }, [updatedUser]);

  // Resets authenticated values in local storage
  const logOut = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link to="/">
          <div>
            <LogoText />
          </div>
        </Link>
        {search != null && search ? <SearchBar></SearchBar> : null}

        <div className={styles.showOptions}>
          {isLoggedIn && user ? (
            <div>
              <div className={styles.menu}>
                <Avatar url={user.avatar} />
                <div className={styles.arrow}>
                  <Icon name="arrow-down" />
                </div>
              </div>
              <div className={styles.hiddenMenu}>
                <Link to="/admin/overview">Overview</Link>
                <Link to="/admin/account">Manage account</Link>
                <div></div>
                <span onClick={logOut}>Log out</span>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.menu}>
                <Icon name="menu"></Icon>
              </div>
              <div className={styles.hiddenMenu}>
                <Link to="/login">Log in</Link>
                <Link to="/register">Create account</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
