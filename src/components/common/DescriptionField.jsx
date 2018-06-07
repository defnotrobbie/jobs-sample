import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";

const CustomDescriptionField = ({ label, ...rest }) => (
  <Typography
    variant="body1"
    style={{
      marginTop: 16,
      color: "rgba(0, 0, 0, 0.54)",
      padding: 0,
      fontSize: "1rem",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      lineHeight: 1
    }}
  >
    {label}
  </Typography>
);

CustomDescriptionField.propTypes = {
  label: PropTypes.string.isRequired
};
export default CustomDescriptionField;
