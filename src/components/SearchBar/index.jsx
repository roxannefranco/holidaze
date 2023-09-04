import styles from "./styles.module.css";
import Icon from "../../components/Icon";

function SearchBar() {
  return (
    <div className={styles.searchInput}>
      <input placeholder="Start typing to search..." />
      <div className={styles.searchBtn}>
        <Icon name="search"></Icon>
      </div>
    </div>
  );
}

export default SearchBar;
