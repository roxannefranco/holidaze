import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import styles from "./styles.module.css";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { countries } from "../../configs/countries";
import { getAllVenues } from "../../api/venues";
import VenueCard from "./components/VenueCard";

function Home() {
  // State
  const [country, setCountry] = useState(0);
  const [guests, setGuests] = useState(2);
  const [venues, setVenues] = useState([]);
  const [countryFilter, setCountryFilter] = useState(null);
  const [guestsFilter, setGuestsFilter] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchVenues();
  }, []);

  // Fetch venues from API
  const fetchVenues = async () => {
    const result = await getAllVenues();
    setVenues(result);
    setLoaded(true);
  };

  const countriesOptions = [{ value: 0, label: "Where are you staying?" }];
  Object.keys(countries).map((country) => {
    countriesOptions.push({ value: country, label: country });
  });

  const guestsOptions = [
    { value: 1, label: "1 guest" },
    { value: 2, label: "2 guests" },
    { value: 3, label: "3 guests" },
    { value: 4, label: "4 guests" },
    { value: 5, label: "5 guests" },
    { value: 6, label: "6 guests" },
    { value: 7, label: "7 guests" },
    { value: 8, label: "8 guests" },
    { value: 9, label: "9 guests" },
    { value: 10, label: "10 guests" },
  ];

  // Set the filters
  const search = () => {
    if (country) setCountryFilter(country);
    if (guests) setGuestsFilter(guests);

    if (country == 0) setCountryFilter(null);
  };

  const clearSearch = () => {
    setCountryFilter(null);
    setGuestsFilter(null);
    setCountry(0);
    setGuests(2);
  };

  const filteredVenues = venues
    .filter((venue) => {
      // If no filter we return all
      if (countryFilter == null) return true;

      // If filter selected then we need to filter
      return (
        venue.location.country.toLowerCase() === countryFilter.toLowerCase()
      );
    })
    .filter((venue) => {
      // If no filter we return all
      if (guestsFilter == null) return true;

      // If filter selected then we need to filter
      return venue.maxGuests >= guestsFilter;
    });

  return (
    <Layout>
      <Header></Header>
      <div className="center-content">
        {/* Search bar */}
        <div className={styles.searchContainer}>
          <div className={styles.call2Action}>Find your next stay</div>

          <div className={styles.form}>
            <Select
              value={country}
              setValue={setCountry}
              options={countriesOptions}
            />
            <Select
              value={guests}
              setValue={setGuests}
              options={guestsOptions}
            />
            <Button size="lg" onClick={search}>
              Search
            </Button>
          </div>
        </div>

        {countryFilter != null || guestsFilter != null ? (
          <div className={styles.searchResultInfo}>
            <h3>
              Found {filteredVenues.length} results for {guestsFilter} guests{" "}
              {countryFilter != null ? `in ${countryFilter}` : ""}
            </h3>
            <Button
              preIcon="close"
              type="secondary"
              size="sm"
              onClick={clearSearch}
            >
              Clear search
            </Button>
          </div>
        ) : null}

        {/* Venues */}
        {loaded ? (
          <div className={styles.venuesList}>
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </Layout>
  );
}

export default Home;
