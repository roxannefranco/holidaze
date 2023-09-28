import { useNavigate } from "react-router-dom";
import Button from "../../../../../components/Button";
import styles from "./styles.module.css";

function VenueRow(props) {
  const navigate = useNavigate();

  // destructure props
  const { id, media, name, description, price } = props.venue;

  const goToVenueSettings = () => {
    navigate(`/admin/venue/${id}`);
  };

  return (
    <div className={styles.row}>
      <div className={styles.info}>
        {media.length ? (
          <img src={media[0]} alt="" className={styles.previewImage} />
        ) : (
          <svg
            className={styles.previewImage}
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H160V160H0V0Z" fill="#E2E8F0" />
            <path
              d="M114.254 71.3404L90.5507 47.6341C87.6171 44.7091 83.6434 43.0665 79.5007 43.0665C75.358 43.0665 71.3843 44.7091 68.4507 47.6341L44.7475 71.3404C43.8739 72.2084 43.1812 73.2413 42.7097 74.3791C42.2381 75.5169 41.9972 76.7369 42.0007 77.9685V108.647C42.0007 111.133 42.9884 113.518 44.7465 115.276C46.5047 117.034 48.8893 118.022 51.3757 118.022H107.626C110.112 118.022 112.497 117.034 114.255 115.276C116.013 113.518 117.001 111.133 117.001 108.647V77.9685C117.004 76.7369 116.763 75.5169 116.292 74.3791C115.82 73.2413 115.127 72.2084 114.254 71.3404ZM88.8757 111.772H70.1257V99.4779C70.1257 96.9915 71.1134 94.6069 72.8715 92.8487C74.6297 91.0906 77.0143 90.1029 79.5007 90.1029C81.9871 90.1029 84.3716 91.0906 86.1298 92.8487C87.8879 94.6069 88.8757 96.9915 88.8757 99.4779V111.772ZM110.751 108.647C110.751 109.475 110.421 110.27 109.835 110.856C109.249 111.442 108.454 111.772 107.626 111.772H95.1257V99.4779C95.1257 95.3339 93.4795 91.3596 90.5492 88.4293C87.619 85.4991 83.6447 83.8529 79.5007 83.8529C75.3567 83.8529 71.3824 85.4991 68.4521 88.4293C65.5219 91.3596 63.8757 95.3339 63.8757 99.4779V111.772H51.3757C50.5469 111.772 49.752 111.442 49.166 110.856C48.5799 110.27 48.2507 109.475 48.2507 108.647V77.9685C48.2536 77.1403 48.5825 76.3466 49.1663 75.7591L72.8694 52.0622C74.631 50.3089 77.0152 49.3246 79.5007 49.3246C81.9861 49.3246 84.3704 50.3089 86.1319 52.0622L109.835 75.7685C110.417 76.3536 110.745 77.1436 110.751 77.9685V108.647Z"
              fill="#94A3B8"
            />
          </svg>
        )}
        <div className={styles.textInfo}>
          <h4 className={styles.name}>{name}</h4>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.price}>{price}kr / night</div>
      <Button
        type="terciary"
        size="sm"
        preIcon="settings"
        onClick={goToVenueSettings}
      >
        Manage
      </Button>
    </div>
  );
}

export default VenueRow;
