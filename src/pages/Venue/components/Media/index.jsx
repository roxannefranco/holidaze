import classNames from "classnames";
import styles from "./styles.module.css";
import { useState } from "react";
import Icon from "../../../../components/Icon";

function Media(props) {
  // destructure props
  const { media } = props;

  if (!media.length) return null;

  const [activePhoto, setActivePhoto] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  const numberOfPreviews =
    media[3] != null ? 4 : media[2] != null ? 3 : media[1] != null ? 2 : 1;

  const close = () => {
    setPopupOpen(false);
  };

  const open = (index) => {
    setPopupOpen(true);
    setActivePhoto(index);
  };

  const showPrev = () => {
    if (activePhoto === 0) {
      setActivePhoto(media.length - 1);
    } else {
      setActivePhoto(activePhoto - 1);
    }
  };

  const showNext = () => {
    if (activePhoto === media.length - 1) {
      setActivePhoto(0);
    } else {
      setActivePhoto(activePhoto + 1);
    }
  };

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
            <img src={media[0]} alt="venue image" onClick={() => open(0)} />
          </div>
        </div>
        {media[1] != null ? (
          <div className={styles.otherImages}>
            <div>
              <img src={media[1]} alt="venue image" onClick={() => open(1)} />
            </div>
            {media[2] != null ? (
              <div>
                <img src={media[2]} alt="venue image" onClick={() => open(2)} />
              </div>
            ) : null}
            {media[3] != null ? (
              <div>
                <img src={media[3]} alt="venue image" onClick={() => open(3)} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Popup */}
      <div className={classNames(styles.popup, { [styles.open]: popupOpen })}>
        <div className={styles.close} onClick={close}>
          <Icon name="close" />
        </div>
        <div
          className={classNames(styles.arrow, styles.prev)}
          onClick={showPrev}
        >
          <Icon name="arrow-left" />
        </div>
        <div
          className={classNames(styles.arrow, styles.next)}
          onClick={showNext}
        >
          <Icon name="arrow-right" />
        </div>

        <div className={styles.photos}>
          {media.map((url, index) => {
            return (
              <img
                key={index}
                src={url}
                className={index === activePhoto ? styles.active : ""}
              />
            );
          })}
        </div>

        <div className={styles.numbers}>
          {activePhoto + 1} of {media.length}
        </div>
      </div>
    </div>
  );
}

export default Media;
