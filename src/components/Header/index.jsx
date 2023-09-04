import styles from "./styles.module.css";
import LogoText from "../../components/LogoText";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

function Header(props) {
  const { search } = props;

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link to="#">
          <div>
            <LogoText />
          </div>
        </Link>
        {search != null && search ? <SearchBar></SearchBar> : null}
        <div>
          <Icon name="menu"></Icon>
        </div>
      </div>
    </header>
  );
}

export default Header;
