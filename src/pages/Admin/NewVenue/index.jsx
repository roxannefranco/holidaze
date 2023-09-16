import styles from "./styles.module.css";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Checkbox from "../../../components/Checkbox";
import Button from "../../../components/Button";

function NewVenue() {
  return (
    <Layout>
      <Header></Header>
      <div>
        <h1 className={styles.mainTitle}>New Venue</h1>
        <form>
          <Input type="text" label="Name" />
          <Input type="text" label="Description" />
          <Input type="text" label="Media" placeholder="URL" />
          <Input type="text" label="Price" placeholder="kr" />
          <Input type="text" label="Max Guests" />
          <div className={styles.amenitiesBox}>
            <span>Amenities</span>
            <Checkbox label="Wifi"></Checkbox>
            <Checkbox label="Parking"></Checkbox>
            <Checkbox label="Breakfast"></Checkbox>
            <Checkbox label="Pets"></Checkbox>
          </div>
          <span>Location</span>
          <Input type="text" label="Address" />
          <Input type="text" label="City" />
          <Input type="text" label="Zip" />
          <Input type="text" label="Country" />
          <Input type="text" label="Latitude" />
          <Input type="text" label="Longitude" />
          <div className={styles.btns}>
            <Button size="lg" type="primary">
              Create venue
            </Button>
            <Button size="lg" type="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default NewVenue;
