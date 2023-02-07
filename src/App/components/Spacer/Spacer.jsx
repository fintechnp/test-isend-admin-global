import PropTypes from "prop-types";

function Spacer({ height, width }) {
  return (
    <div
      style={{
        height: typeof height == "number" ? height + "rem" : height,
        width: typeof width == "number" ? width + "rem" : width,
      }}
    ></div>
  );
}

export default Spacer;

Spacer.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Spacer.defaultProps = {
  height: "1rem",
  width: "100%",
};
