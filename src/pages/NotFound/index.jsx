import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="404 Not found" />
        <meta name="keywords" content="error, 404, not found" />
        <meta name="author" content="Roxanne Franco" />
        <title>Holidaze | 404</title>
      </Helmet>

      <Header></Header>
      <div className="center-content">
        <div className={styles.notFound}>
          <h1>404 Not found</h1>
          <Button type="primary" size="lg" onClick={goBack}>
            Go back
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
