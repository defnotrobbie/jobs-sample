import React from "react";
import PropTypes from "prop-types";
import MobileStepper from "material-ui/MobileStepper";

const Stepper = ({ steps, step, next, back }) => {
  return (
    <MobileStepper
      // style={{ backgroundColor: "#fef9cd" }}
      style={{ backgroundColor: "white" }}
      variant="dots"
      steps={steps}
      position="static"
      activeStep={step}
      nextButton={next}
      backButton={back}
    />
  );
};

Stepper.propTypes = {
  steps: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  next: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired
};
export default Stepper;
