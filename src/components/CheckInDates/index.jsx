import { useEffect, useState } from "react";
import Icon from "../Icon";
import styles from "./styles.module.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CheckInDates(props) {
  // destructure props
  const { startDate, setStartDate, endDate, setEndDate, bookings } = props;

  // State
  const [bookedDates, setBookedDates] = useState([]);
  const [checkOutMaxDate, setCheckOutMaxDate] = useState(null);
  const [checkInMinDate, setCheckInMinDate] = useState(null);

  useEffect(() => {
    const excluded = [];
    bookings.map((booking) => {
      let date = moment(booking.dateFrom).format("YYYY-MM-DD");
      const end = moment(booking.dateTo).format("YYYY-MM-DD");

      // Get all dates of the booking in the middle
      while (date <= end) {
        const momentDate = moment(date, "YYYY-MM-DD");
        excluded.push(momentDate.toDate());
        date = momentDate.add(1, "day").format("YYYY-MM-DD");
      }
    });

    // To exclude from date picker
    setBookedDates(excluded);
  }, [bookings]);

  // When start date changes
  useEffect(() => {
    if (startDate && bookedDates.length) {
      setCheckOutMaxDate(null);
      setCheckInMinDate(null);

      // Searches for closest exluded date and set it as maxDate
      const selectedStartDate = moment(startDate).format("YYYY-MM-DD");
      // Custom sort to sort from small to big
      const sortedDates = sortDates();

      // Exclude dates before selectedStartDate
      const filteredDates = sortedDates.filter((date) => {
        const formated = moment(date).format("YYYY-MM-DD");
        return formated > selectedStartDate;
      });

      // Closest excluded date should be the first in the array
      if (filteredDates[0] != null) {
        setCheckOutMaxDate(filteredDates[0]);
      }
    }
  }, [startDate, bookedDates]);

  // When end date changes
  useEffect(() => {
    if (endDate && bookedDates.length) {
      setCheckOutMaxDate(null);
      setCheckInMinDate(null);

      // Searches for closest exluded date and set it as minDate
      const selectedEndDate = moment(endDate).format("YYYY-MM-DD");
      // Custom sort to sort from small to big
      const sortedDates = sortDates();

      // Exclude dates after selectedEndDate
      const filteredDates = sortedDates.filter((date) => {
        const formated = moment(date).format("YYYY-MM-DD");
        return formated < selectedEndDate;
      });

      // Closest excluded date should be the last in the array
      if (filteredDates[filteredDates.length - 1] != null) {
        setCheckInMinDate(filteredDates[filteredDates.length - 1]);
      }
    }
  }, [endDate, bookedDates]);

  const sortDates = () => {
    const sortedDates = bookedDates.sort((a, b) => {
      const aDate = moment(a).format("YYYY-MM-DD");
      const bDate = moment(b).format("YYYY-MM-DD");
      if (aDate > bDate) return 1;
      if (aDate < bDate) return -1;
      return 0;
    });

    return sortedDates;
  };

  return (
    <div className={styles.inputs}>
      {/* Start */}
      <div className={styles.inputContainer}>
        <label>Check in</label>
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd.MM.yyyy"
          minDate={checkInMinDate != null ? checkInMinDate : new Date()}
          maxDate={endDate != null ? endDate : null}
          excludeDates={bookedDates}
          onChange={(date) => setStartDate(date)}
        />
        <span className={styles.loginIcons}>
          <Icon name="calendar" />
        </span>
      </div>

      {/* End */}
      <div className={styles.inputContainer}>
        <label>Check out</label>
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd.MM.yyyy"
          minDate={startDate != null ? startDate : new Date()}
          maxDate={checkOutMaxDate}
          excludeDates={bookedDates}
          onChange={(date) => setEndDate(date)}
        />
        <span className={styles.loginIcons}>
          <Icon name="calendar" />
        </span>
      </div>
    </div>
  );
}

export default CheckInDates;
