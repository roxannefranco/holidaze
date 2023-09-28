import classNames from "classnames";
import styles from "./styles.module.css";

function Media(props) {
  // destructure props
  const { media } = props;

  if (!media.length) return null;

  const numberOfPreviews =
    media[3] != null ? 4 : media[2] != null ? 3 : media[1] != null ? 2 : 1;

  return (
    <div>
      <div
        className={classNames(
          styles.frame,
          styles[`previews-${numberOfPreviews}`]
        )}
      >
        <div className={styles.mainImage}>
          <div>
            <img src={media[0]} alt="" />
          </div>
        </div>
        {media[1] != null ? (
          <div className={styles.otherImages}>
            <div>
              <img src={media[1]} alt="" />
            </div>
            {media[2] != null ? (
              <div>
                <img src={media[2]} alt="" />
              </div>
            ) : null}
            {media[3] != null ? (
              <div>
                <img src={media[3]} alt="" />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Media;
