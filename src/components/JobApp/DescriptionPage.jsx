import React from "react";
import PropTypes from "prop-types";
import Fade from "material-ui/transitions/Fade";
import Typography from "material-ui/Typography";

const Description = props => {
  return (
    <Fade in={!props.loading}>
      <Typography style={{ whiteSpace: "pre-wrap" }} component="pre">
        {props.text}
      </Typography>
    </Fade>
  );
};
Description.defaultProps = {
  text: ""
};
Description.propTypes = {
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

export default Description;
