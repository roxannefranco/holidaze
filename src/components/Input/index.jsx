import Icon from "../Icon";
import styles from "./styles.module.css";

function Input(props) {
  // destructure props
  const { type, icon, label, value, setValue } = props;

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        required
        value={value}
        // setting new value on state
        onChange={(event) => setValue(event.target.value)}
      />
      {icon != null ? (
        <span className={styles.loginIcons}>
          <Icon name={icon} required />
        </span>
      ) : null}

      {label != null ? <label>{label}</label> : null}
    </div>
  );
}

export default Input;
