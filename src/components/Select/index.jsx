import { countries } from "../../configs/countries";
import Icon from "../Icon";
import styles from "./styles.module.css";

function Select(props) {
  // destructure props
  const { value, label, options, required, setValue } = props;

  return (
    <div className={styles.container}>
      {label != null ? <label>{label}</label> : null}

      <div className={styles.dropdown}>
        <select
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {/* Mapping countries */}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span>
          <Icon name="arrow-down" required />
        </span>
      </div>
    </div>
  );
}

export default Select;
