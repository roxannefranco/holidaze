import classNames from "classnames";
import styles from "./styles.module.css";
import Icon from "../Icon";

function Checkbox(props) {
  // destructure props
  const { id, label } = props;

  return (
    <div className={styles.container}>
      <input id={id} type="checkbox" />
      <label htmlFor={id}>
        <span className={styles.checkbox}>
          <Icon name="check" />
        </span>
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  );
}

export default Checkbox;
