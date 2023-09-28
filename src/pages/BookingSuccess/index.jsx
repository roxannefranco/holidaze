import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

function BookingSuccess() {
  const { id } = useParams();

  return (
    <Layout>
      <Header></Header>
      <div className="center-content">Booking success: {id}</div>
    </Layout>
  );
}

export default BookingSuccess;
