import { useEffect } from "react";
import Icon from "../Icon";
import styles from "./styles.module.css";

function Input(props) {
  // destructure props
  const {
    type,
    icon,
    label,
    value,
    required,
    placeholder,
    textarea,
    setValue,
    media,
  } = props;

  // Runs everytime there is a change in "value"
  useEffect(() => {
    // Only when input is type media
    if (media != null && media) {
      // Check if all inputs have content
      const totalWithContent = value.filter((v) => v.length > 0).length;
      const totalWithoutContent = value.filter((v) => v.length == 0).length;
      const total = value.length;

      if (total === totalWithContent) {
        // Adds one more input
        const values = value.slice();
        values.push("");
        setValue(values);
      } else if (total > 2 && totalWithoutContent > 1) {
        // Removes one empty input
        const firstIndexWithoutContent = value.findIndex((v) => v.length == 0);
        const values = value.slice();
        values.splice(firstIndexWithoutContent, 1);
        setValue(values);
      }
    }
  }, [value]);

  return (
    <div className={styles.inputContainer}>
      {label != null ? <label>{label}</label> : null}

      {/* Textarea */}
      {textarea != null && textarea ? (
        <textarea
          // setting new value on state
          placeholder={placeholder}
          required={required}
          onChange={(event) => setValue(event.target.value)}
          value={value}
        ></textarea>
      ) : null}

      {/* Media */}
      {media != null && media
        ? value.map((v, index) => {
            return (
              <input
                key={index}
                type={type}
                required={required}
                value={v}
                placeholder={placeholder}
                style={{ marginBottom: "5px" }}
                // setting new value on state
                onChange={(event) => {
                  // Clone array: https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
                  const values = value.slice();
                  // Change correct position
                  values[index] = event.target.value;
                  setValue(values);
                }}
              />
            );
          })
        : null}

      {/* Normal text input */}
      {(textarea == null || !textarea) && (media == null || !media) ? (
        <input
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          // setting new value on state
          onChange={(event) => setValue(event.target.value)}
        />
      ) : null}

      {icon != null ? (
        <span className={styles.loginIcons}>
          <Icon name={icon} required />
        </span>
      ) : null}
    </div>
  );
}

export default Input;
