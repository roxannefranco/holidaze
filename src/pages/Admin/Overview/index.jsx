import styles from "./styles.module.css";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import { getUserVenues } from "../../../api/venues";
import { getUserBookings } from "../../../api/bookings";
import VenueRow from "./components/VenueRow";
import BookingRow from "./components/BookingRow";
import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage == null) {
      setUser(false);
    } else {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  useEffect(() => {
    if (user != null && user) {
      // Call async function outside useEffect
      fetchVenues(user.name);
      fetchBookings(user.name);
    }
  }, [user]);

  // Fetch venues from API
  const fetchVenues = async (username) => {
    const result = await getUserVenues(username);
    setVenues(result);

    if (result.length > 0) {
      setActiveTab("venues");
    }
  };

  // Fetch bookings from API
  const fetchBookings = async (username) => {
    const result = await getUserBookings(username);
    setBookings(result);
  };

  const goToNewVenue = () => {
    navigate("/admin/new-venue");
  };

  const goToAccount = () => {
    navigate("/admin/account");
  };

  return (
    <Layout>
      <Header></Header>
      <div className="center-content">
        <div className={styles.container}>
          {/* Left side: Profile */}
          <div className={styles.profile}>
            {user != null && user ? (
              <div className={styles.profileWrapper}>
                <Avatar url={user.avatar} size="146px" />
                <div className={styles.userInfo}>
                  <div className={styles.name}>{user.name}</div>
                  <div className={styles.email}>{user.email}</div>
                </div>
                <Button
                  type="terciary"
                  size="lg"
                  preIcon="settings"
                  onClick={goToAccount}
                >
                  Account
                </Button>
              </div>
            ) : null}
          </div>

          {/* Right side: Venues and Bookings */}
          <div className={styles.lists}>
            <div className={styles.listsWrapper}>
              {/* Tabs */}
              <ul>
                <li
                  className={activeTab === "venues" ? styles.active : ""}
                  onClick={() => setActiveTab("venues")}
                >
                  My Venues
                </li>
                <li
                  className={activeTab === "bookings" ? styles.active : ""}
                  onClick={() => setActiveTab("bookings")}
                >
                  My Bookings
                </li>
              </ul>

              {activeTab === "venues" ? (
                <div>
                  <div className={styles.venueList}>
                    {venues.map((venue) => {
                      return <VenueRow key={venue.id} venue={venue} />;
                    })}
                  </div>
                  <div className={styles.venueActions}>
                    <Button
                      type="terciary"
                      preIcon="add"
                      onClick={goToNewVenue}
                    >
                      Add new
                    </Button>
                  </div>
                </div>
              ) : null}

              {activeTab === "bookings" ? (
                <div className={styles.venueList}>
                  {bookings
                    .sort((a, b) => {
                      if (a.dateFrom < b.dateFrom) return 1;
                      if (a.dateFrom > b.dateFrom) return -1;
                      return 0;
                    })
                    .map((booking) => {
                      return <BookingRow key={booking.id} booking={booking} />;
                    })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Overview;
