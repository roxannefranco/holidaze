import classNames from "classnames";
import styles from "./styles.module.css";

function Avatar(props) {
  // destructure props
  const { url, size } = props;

  // use 30px as default or prop value
  const finalSize = size != null ? size : "30px";

  if (url != null && url.length) {
    return (
      <img
        src={url}
        width={finalSize}
        height={finalSize}
        className={styles.avatar}
      />
    );
  }

  return (
    <svg
      className={styles.avatar}
      width={finalSize}
      height={finalSize}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H160V160H0V0Z" fill="#E2E8F0" />
      <path
        d="M139 160C139 144.75 132.942 129.625 122.159 118.841C111.375 108.058 96.7499 102 81.5 102C66.2501 102 51.6247 108.058 40.8414 118.841C30.058 129.625 24 144.75 24 160H139Z"
        fill="#94A3B8"
      />
      <path
        d="M113 71C113 88.1208 99.1208 102 82 102C64.8792 102 51 88.1208 51 71C51 53.8792 64.8792 40 82 40C99.1208 40 113 53.8792 113 71Z"
        fill="#94A3B8"
      />
    </svg>
  );
}

export default Avatar;
