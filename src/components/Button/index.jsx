import styles from "./styles.module.css";

function Button(props) {
  return (
    <div>
      <button className={styles.mainBtn}>{props.children}</button>
    </div>
  );
}

export default Button;
