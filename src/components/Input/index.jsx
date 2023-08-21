import Icon from "../Icon";
import styles from "./styles.module.css";

function Input(props) {
  return (
    <div>
      <input type={props.type} required />
      <Icon name={props.icon} required />
    </div>
  );
}

export default Input;
