import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooking } from "../../api/bookings";
import styles from "./styles.module.css";
import moment from "moment";

function BookingSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id != null) {
      fetchBooking();
    }
  }, [id]);

  const fetchBooking = async () => {
    const result = await getBooking(id);
    if (result.errors == null) {
      setBooking(result);
    }
  };

  const goToGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir//${booking.venue.location.lat},${booking.venue.location.lng}/@${booking.venue.location.lat},${booking.venue.location.lng},14z/data=!3m1!4b1!4m2!4m1!3e3?entry=ttu`,
      "_blank"
    );
  };

  const goToAdmin = () => {
    navigate("/admin/overview");
  };

  return (
    <Layout>
      <Header></Header>
      <div className="center-content-sm">
        <h1 className={styles.mainTitle}>Your booking</h1>
        {booking != null ? (
          <div className={styles.container}>
            <div className={styles.detailsSide}>
              <div className={styles.details}>
                {/* Venue info */}
                <div className={styles.venueInfo}>
                  {booking.venue.media[0] != null ? (
                    <img
                      className={styles.image}
                      src={booking.venue.media[0]}
                    />
                  ) : null}
                  <div className={styles.infoContainer}>
                    <div className={styles.info}>
                      <h3>{booking.venue.name}</h3>
                      <div>
                        {booking.venue.location.city},{" "}
                        {booking.venue.location.country}
                      </div>
                    </div>
                    {booking.venue.rating ? (
                      <div className={styles.rating}>
                        <Icon name="star" />
                        <span>{booking.venue.rating}</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Booking info */}
                <div className={styles.bookingInfo}>
                  <p>
                    When:{" "}
                    <span>
                      {moment(booking.dateFrom).format("Do MMMM, YYYY")} -
                      {moment(booking.dateTo).format("Do MMMM, YYYY")}
                    </span>
                  </p>
                  <p>
                    Guests: <span>{booking.guests} guests</span>
                  </p>
                  <Button
                    type="secondary"
                    block
                    size="lg"
                    preIcon="map"
                    onClick={goToGoogleMaps}
                  >
                    Get directions
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.success}>
              <svg
                width="116"
                height="116"
                viewBox="0 0 116 116"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M115.23 58C115.12 54.0652 113.921 50.234 111.758 46.9389C109.602 43.6498 106.569 41.0185 103 39.3496C104.358 35.6524 104.644 31.6507 103.852 27.7951C103.054 23.9335 101.191 20.3764 98.4801 17.5198C95.6174 14.8093 92.0664 12.9516 88.2048 12.1476C84.3492 11.3558 80.3475 11.642 76.6503 13.0003C74.9875 9.42496 72.3623 6.38559 69.0671 4.22941C65.772 2.07323 61.9408 0.86723 58 0.769775C54.0652 0.873321 50.2462 2.06714 46.9571 4.22941C43.668 6.39168 41.055 9.43105 39.4044 13.0003C35.7011 11.642 31.6872 11.3436 27.8195 12.1476C23.9518 12.9394 20.3886 14.8032 17.5259 17.5198C14.8154 20.3825 12.9638 23.9457 12.178 27.8012C11.3862 31.6568 11.6908 35.6585 13.0551 39.3496C9.47978 41.0185 6.43432 43.6437 4.26596 46.9328C2.09759 50.2219 0.885503 54.0591 0.769775 58C0.891594 61.9408 2.09759 65.772 4.26596 69.0671C6.43432 72.3562 9.47978 74.9875 13.0551 76.6503C11.6908 80.3414 11.3862 84.3431 12.178 88.1987C12.9699 92.0603 14.8154 95.6174 17.5198 98.4801C20.3825 101.178 23.9396 103.03 27.7951 103.828C31.6507 104.632 35.6524 104.34 39.3496 103C41.0185 106.569 43.6437 109.602 46.9389 111.764C50.228 113.921 54.0652 115.12 58 115.23C61.9408 115.133 65.772 113.933 69.0671 111.777C72.3623 109.62 74.9875 106.575 76.6503 103.006C80.3292 104.461 84.3614 104.809 88.2413 104.005C92.1151 103.201 95.6722 101.282 98.4741 98.4801C101.276 95.6783 103.201 92.1212 104.005 88.2413C104.809 84.3614 104.461 80.3292 103 76.6503C106.569 74.9814 109.602 72.3562 111.764 69.061C113.921 65.772 115.12 61.9347 115.23 58ZM49.8503 81.45L28.9646 60.5703L36.8401 52.64L49.4605 65.2603L76.2605 36.0605L84.465 43.6498L49.8503 81.45Z"
                  fill="#006E51"
                />
              </svg>
              <div className={styles.message}>
                <h4>Success!</h4>
                <p>
                  Your request is now waiting for the host’s approval. This can
                  take up to 24h.
                </p>
              </div>
              <Button type="secondary" size="lg" onClick={goToAdmin}>
                Go to your bookings
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default BookingSuccess;
