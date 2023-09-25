import { countries } from "../../configs/countries";
import Icon from "../Icon";
import styles from "./styles.module.css";

function CountrySelect(props) {
  // destructure props
  const { value, required, setValue } = props;

  return (
    <div className={styles.container}>
      <label>Country</label>

      <div className={styles.dropdown}>
        <select
          id="country"
          name="country"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {/* Mapping countries */}
          {Object.keys(countries).map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <span className={styles.loginIcons}>
          <Icon name="arrow-down" required />
        </span>
      </div>
    </div>
  );
}

export default CountrySelect;
