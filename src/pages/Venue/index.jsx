import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { getVenue } from "../../api/venues";

function Venue() {
  const { id } = useParams();

  // State
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetchVenue(id);
  }, [id]);

  const fetchVenue = async (id) => {
    const result = await getVenue(id);
    setVenue(result);
  };

  return (
    <Layout>
      <Header></Header>
      {venue != null ? (
        <div className="center-content">
          <h1>{venue.name}</h1>
        </div>
      ) : null}
    </Layout>
  );
}

export default Venue;
