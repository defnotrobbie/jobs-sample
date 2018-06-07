import React from "react";
import PropTypes from "prop-types";
import Radio, { RadioGroup } from "material-ui/Radio";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";

const CustomRadio = ({
  input,
  options,
  label,
  fullWidth,
  margin,
  meta: { touched, error },
  disabled,
  ...rest
}) => {
  return (
    <FormControl
      component="fieldset"
      required={rest.required}
      fullWidth={fullWidth}
      margin={margin}
      error={!!(touched && error)}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={label} {...input} {...rest}>
        {options
          ? options.map((opt, i) => (
              <FormControlLabel
                disabled={disabled}
                key={"label" + i}
                value={opt.value}
                control={<Radio />}
                label={opt.label}
              />
            ))
          : []}
      </RadioGroup>
      <FormHelperText style={{ margin: 0 }}>
        {touched && error ? error : " "}
      </FormHelperText>
    </FormControl>
  );
};

CustomRadio.propTypes = {
  input: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  ),
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  })
};
export default CustomRadio;
