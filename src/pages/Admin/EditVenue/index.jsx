import styles from "./styles.module.css";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Checkbox from "../../../components/Checkbox";
import Button from "../../../components/Button";
import CountrySelect from "../../../components/CountrySelect";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { getVenue, editVenue, deleteVenue } from "../../../api/venues";
import { useNavigate, useParams } from "react-router-dom";

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(["", ""]);
  const [price, setPrice] = useState("");
  const [maxGuests, setGuests] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("Norway");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errorsList, setErrors] = useState([]);

  useEffect(() => {
    fetchVenue(id);
  }, [id]);

  const fetchVenue = async (id) => {
    const result = await getVenue(id);
    if (result.errors == null) {
      setName(result.name);
      setDescription(result.description);
      setMedia(result.media);
      setPrice(result.price);
      setGuests(result.maxGuests);
      setWifi(result.meta.wifi);
      setParking(result.meta.parking);
      setBreakfast(result.meta.breakfast);
      setPets(result.meta.pets);
      setAddress(result.location.address);
      setCity(result.location.city);
      setZip(result.location.zip);
      setCountry(result.location.contry);
      setLatitude(result.location.lat);
      setLongitude(result.location.lng);
    }
  };

  /**
   * First validates the form, if valid, then send to API
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    // Reset errors on every submition
    setErrors([]);

    const errors = [];

    if (price <= 0) {
      errors.push("Please set a valid price");
    }

    if (maxGuests <= 0) {
      errors.push("Please set at least one guest");
    }

    if (errors.length) {
      setErrors(errors);
    } else {
      // send to api
      const result = await editVenue(
        id,
        name,
        description,
        media,
        price,
        maxGuests,
        wifi,
        parking,
        breakfast,
        pets,
        address,
        city,
        zip,
        country,
        latitude,
        longitude
      );

      if (result.errors != null) {
        setErrors(result.errors.map((error) => error.message));
      } else {
        goToVenueSettings(e);
      }
    }
  };

  const goToVenueSettings = (e) => {
    e.preventDefault();
    navigate(`/admin/venue/${id}`);
  };

  const askUserToDelete = (e) => {
    e.preventDefault();
    const result = window.confirm(
      "Are you sure you want to delete your Venue? This action cannot be undone."
    );
    if (result) {
      // user said yes, delete
      deleteVenue(id);
      navigate(`/admin/overview`);
    }
  };

  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Edit venue" />
        <meta name="keywords" content="edit, change, update" />
        <meta name="author" content="Roxanne Franco" />
        <title>Edit Venue</title>
      </Helmet>
      <Header></Header>
      <div className={styles.formWrapper}>
        <h1 className={styles.mainTitle}>New Venue</h1>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            label="Name"
            value={name}
            setValue={setName}
            required
          />
          <Input
            type="text"
            label="Description"
            required
            textarea
            value={description}
            setValue={setDescription}
          />
          <Input
            type="text"
            label="Media"
            placeholder="URL"
            value={media}
            setValue={setMedia}
            media
          />
          <div className={styles.priceGuests}>
            <Input
              className={styles.price}
              type="number"
              label="Price per night"
              value={price}
              setValue={setPrice}
              required
            />
            <Input
              className={styles.price}
              type="number"
              label="Max Guests"
              value={maxGuests}
              setValue={setGuests}
              required
            />
          </div>
          <div className={styles.amenitiesBox}>
            <div className={styles.separator}>Amenities</div>
            <div className={styles.checks}>
              <Checkbox
                id="wifi"
                label="Wifi"
                value={wifi}
                setValue={setWifi}
              ></Checkbox>
              <Checkbox
                id="parking"
                label="Parking"
                value={parking}
                setValue={setParking}
              ></Checkbox>
              <Checkbox
                id="breakfast"
                label="Breakfast"
                value={breakfast}
                setValue={setBreakfast}
              ></Checkbox>
              <Checkbox
                id="pets"
                label="Pets"
                value={pets}
                setValue={setPets}
              ></Checkbox>
            </div>
          </div>
          <div className={styles.location}>
            <div className={styles.separator}>Location</div>
          </div>
          <Input
            type="text"
            label="Address"
            value={address}
            setValue={setAddress}
          />
          <div className={styles.address1}>
            <Input type="text" label="City" value={city} setValue={setCity} />
            <Input type="text" label="Zip" value={zip} setValue={setZip} />
            <CountrySelect value={country} setValue={setCountry} />
          </div>
          <div className={styles.address2}>
            <Input
              type="text"
              label="Latitude"
              value={latitude}
              setValue={setLatitude}
            />
            <Input
              type="text"
              label="Longitude"
              value={longitude}
              setValue={setLongitude}
            />
          </div>

          {errorsList.length ? (
            <div className="error-message">
              {errorsList.map((message, index) => {
                return <p key={index}>{message}</p>;
              })}
            </div>
          ) : null}

          <div className={styles.btns}>
            <Button size="lg" type="primary" preIcon="check">
              Save changes
            </Button>
            <Button size="lg" type="secondary" onClick={askUserToDelete}>
              Delete venue
            </Button>
            <Button size="lg" type="terciary" onClick={goToVenueSettings}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EditVenue;
