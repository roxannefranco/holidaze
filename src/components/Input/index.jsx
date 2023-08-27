import Icon from "../Icon";
import styles from "./styles.module.css";

function Input(props) {
  // destructure props
  const { type, icon, value, setValue } = props;

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        required
        value={value}
        // setting new value on state
        onChange={(event) => setValue(event.target.value)}
      />
      <span className={styles.loginIcons}>
        <Icon name={icon} required />
      </span>
    </div>
  );
}

export default Input;
