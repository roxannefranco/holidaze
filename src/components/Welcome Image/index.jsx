import styles from "./styles.module.css";

function WelcomeImage() {
  return (
    <div className={styles.container}>
      <img src="img/welcomeimage.jpg" alt="house in nature" />
    </div>
  );
}

export default WelcomeImage;
