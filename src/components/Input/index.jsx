import Icon from "../Icon";
import styles from "./styles.module.css";

function Input(props) {
  return (
    <div className={styles.inputContainer}>
      <input type={props.type} required />
      <span className={styles.loginIcons}>
        <Icon name={props.icon} required />
      </span>
    </div>
  );
}

export default Input;
