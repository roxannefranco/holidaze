import Button from "../../../../components/Button";
import styles from "./styles.module.css";
import { useState } from "react";
import CheckInDates from "../../../../components/CheckInDates";
import Select from "../../../../components/Select";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { newBooking } from "../../../../api/bookings";

function BookingForm(props) {
  const navigate = useNavigate();

  // destructure props
  const { venue } = props;

  // state
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState([]);

  const guestsOptions = [];

  for (let i = 1; i <= venue.maxGuests; i++) {
    guestsOptions.push({
      value: i,
      label: `${i} ${i === 1 ? "guest" : "guests"}`,
    });
  }

  const goToVenues = () => {
    navigate("/");
  };

  const saveBooking = async (e) => {
    e.preventDefault();

    setErrors([]);

    const result = await newBooking(
      dateFrom,
      dateTo,
      parseInt(guests),
      venue.id
    );
    if (result.errors != null) {
      setErrors(result.errors);
    } else {
      navigate(`/booking-success/${result.id}`);
    }
  };

  const diff = moment(dateTo).diff(moment(dateFrom), "days");
  // Prevents 0 nights in case of one day stays
  const numberOfNights = diff ? diff : 1;

  return (
    <div className={styles.container}>
      <div className={styles.price}>
        {venue.price} kr <span>per night</span>
      </div>
      <form className={styles.formContainer} onSubmit={saveBooking}>
        <CheckInDates
          startDate={dateFrom}
          setStartDate={setDateFrom}
          endDate={dateTo}
          setEndDate={setDateTo}
          bookings={venue.bookings}
        />
        <Select value={guests} setValue={setGuests} options={guestsOptions} />

        <div className={styles.totals}>
          {dateFrom != null && dateTo != null ? (
            <div>
              <div className={styles.sum}>
                <div>
                  {venue.price} kr x {numberOfNights} nights
                </div>
                <span>{venue.price * numberOfNights} kr</span>
              </div>
              <div className={styles.sum}>
                <div>Cleaning fee</div>
                <span>800 kr</span>
              </div>
              <div className={styles.total}>
                <div>Total</div>
                <span>{venue.price * numberOfNights + 800} kr</span>
              </div>
            </div>
          ) : null}
        </div>

        {errors.length ? (
          <div className="error-message">
            {errors.map((error) => {
              return error.message;
            })}
          </div>
        ) : null}

        {dateFrom != null && dateTo != null ? (
          <Button block type="primary">
            Request booking
          </Button>
        ) : null}
      </form>
      <Button block type="secondary" onClick={goToVenues}>
        Back to venues
      </Button>
    </div>
  );
}

export default BookingForm;
