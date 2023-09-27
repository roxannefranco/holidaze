import { useNavigate } from "react-router-dom";
import Button from "../../../../../components/Button";
import styles from "./styles.module.css";
import Avatar from "../../../../../components/Avatar";
import moment from "moment";

function BookingRow(props) {
  const navigate = useNavigate();

  // destructure props
  const { id, dateFrom, dateTo, guests, customer } = props.booking;

  return (
    <div className={styles.row}>
      <div className={styles.customer}>
        <Avatar url={customer.avatar} />
        <div className={styles.text}>
          {customer.name}{" "}
          {guests > 1
            ? `& ${guests - 1} other ${guests - 1 == 1 ? "guest" : "guests"}`
            : ""}
        </div>
      </div>
      <div className={styles.dates}>
        {moment(dateFrom).format("Do MMM, YYYY")} -{" "}
        {moment(dateTo).format("Do MMM, YYYY")}
      </div>
    </div>
  );
}

export default BookingRow;
