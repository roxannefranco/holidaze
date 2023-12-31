import classNames from "classnames";
import styles from "./styles.module.css";
import Icon from "../Icon";

function Button(props) {
  // destructure props
  const { type, size, preIcon, postIcon, block, children, onClick } = props;

  // use md as default or prop value
  const finalSize = size != null ? size : "md";

  // use primary as default or props value
  const finalType = type != null ? type : "primary";

  return (
    <div>
      <button
        className={classNames(
          styles.mainBtn,
          styles[finalType],
          styles[finalSize],
          {
            [styles.block]: block,
          }
        )}
        onClick={onClick}
      >
        <Icon name={preIcon} />
        <span>{children}</span>
        <Icon name={postIcon} />
      </button>
    </div>
  );
}

export default Button;
