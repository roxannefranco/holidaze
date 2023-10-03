import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Media from "./components/Media";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { getVenue } from "../../api/venues";
import Icon from "../../components/Icon";
import BookingForm from "./components/BookingForm";
import Loader from "../../components/Loader";

function Venue() {
  const { id } = useParams();

  // State
  const [venue, setVenue] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchVenue(id);
  }, [id]);

  const fetchVenue = async (id) => {
    const result = await getVenue(id);
    setVenue(result);
    setLoaded(true);
  };

  const goToGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir//${venue.location.lat},${venue.location.lng}/@${venue.location.lat},${venue.location.lng},14z/data=!3m1!4b1!4m2!4m1!3e3?entry=ttu`,
      "_blank"
    );
  };

  return (
    <Layout>
      <Header></Header>
      {venue != null ? (
        <div className="center-content">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.titleAndLocation}>
              <h1>{venue.name}</h1>
              <div className={styles.location}>
                <Icon name="map-marker" />
                <span>
                  {venue.location.city}, {venue.location.country}
                </span>
              </div>
            </div>
            <div className={styles.ratingAndMaps}>
              {venue.rating ? (
                <div className={styles.rating}>
                  <Icon name="star" />
                  <span>{venue.rating}</span>
                </div>
              ) : null}
              <Button
                size="lg"
                type="secondary"
                preIcon="map"
                onClick={goToGoogleMaps}
              >
                See on map
              </Button>
            </div>
          </div>

          {/* Media */}
          <Media media={venue.media} />
        </div>
      ) : null}

      {/* Info */}
      {loaded ? (
        venue != null ? (
          <div className={styles.infoContainer}>
            <div className="center-content">
              <div className={styles.infoWrapper}>
                <div className={styles.info}>
                  <h4>The space</h4>
                  <p>{venue.description}</p>
                  <h4>Amenities</h4>
                  <div className={styles.amenities}>
                    {venue.meta.wifi ? (
                      <div>
                        <Icon name="wifi" />
                        <span>Wifi</span>
                      </div>
                    ) : null}
                    {venue.meta.parking ? (
                      <div>
                        <Icon name="parking" />
                        <span>Parking</span>
                      </div>
                    ) : null}
                    {venue.meta.breakfast ? (
                      <div>
                        <Icon name="breakfast" />
                        <span>Breakfast</span>
                      </div>
                    ) : null}
                    {venue.meta.pets ? (
                      <div>
                        <Icon name="pets" />
                        <span>Pet friendly</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.booking}>
                  <BookingForm venue={venue} />
                </div>
              </div>
            </div>
          </div>
        ) : null
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Venue;
