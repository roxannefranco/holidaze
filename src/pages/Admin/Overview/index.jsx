import styles from "./styles.module.css";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import { getUserVenues } from "../../../api/venues";
import { getUserBookings } from "../../../api/bookings";
import VenueRow from "./components/VenueRow";
import BookingRow from "./components/BookingRow";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader";

function Overview() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [user, setUser] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [bookingsLoaded, setBookingsLoaded] = useState(false);
  const [venuesLoaded, setVenuesLoaded] = useState(false);

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

  // Detect if any search parameter is present in URL and if so, change active tab
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "bookings" || tab === "venues") {
      setActiveTab(tab);
    } else {
      // Set default to bookings
      setActiveTab("bookings");
      setSearchParams(`?tab=bookings`);
    }
  }, [searchParams]);

  // Fetch venues from API
  const fetchVenues = async (username) => {
    const result = await getUserVenues(username);
    setVenues(result);
    setVenuesLoaded(true);
  };

  // Fetch bookings from API
  const fetchBookings = async (username) => {
    const result = await getUserBookings(username);
    setBookings(result);
    setBookingsLoaded(true);
  };

  const goToNewVenue = () => {
    navigate("/admin/new-venue");
  };

  const goToAccount = () => {
    navigate("/admin/account");
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    // Change query parameters in the URL
    setSearchParams(`?tab=${tab}`);
  };

  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Overview" />
        <meta name="keywords" content="overview, manager, management" />
        <meta name="author" content="Roxanne Franco" />
        <title>Overview</title>
      </Helmet>
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
                  onClick={() => changeTab("venues")}
                >
                  My Venues
                </li>
                <li
                  className={activeTab === "bookings" ? styles.active : ""}
                  onClick={() => changeTab("bookings")}
                >
                  My Bookings
                </li>
              </ul>

              {activeTab === "venues" && user.venueManager ? (
                venuesLoaded ? (
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
                ) : (
                  <Loader />
                )
              ) : activeTab === "venues" ? (
                <div className={styles.notHost}>
                  <h4>Want to start hosting your own venues?</h4>
                  <div className={styles.venueActions}>
                    <Button
                      type="primary"
                      preIcon="settings"
                      onClick={goToAccount}
                    >
                      Become a host
                    </Button>
                  </div>
                </div>
              ) : null}

              {activeTab === "bookings" ? (
                bookingsLoaded ? (
                  <div className={styles.venueList}>
                    {bookings.length ? (
                      bookings
                        .sort((a, b) => {
                          if (a.dateFrom < b.dateFrom) return 1;
                          if (a.dateFrom > b.dateFrom) return -1;
                          return 0;
                        })
                        .map((booking) => {
                          return (
                            <BookingRow key={booking.id} booking={booking} />
                          );
                        })
                    ) : (
                      <div className={styles.noBookings}>
                        <span>No bookings scheduled.</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Loader />
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Overview;
