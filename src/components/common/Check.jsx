import React from "react";
import PropTypes from "prop-types";
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
class CustomCheck extends React.Component {
  handleChange = opt => event => {
    const newValue = [...this.props.input.value];
    if (event.target.checked) {
      newValue.push(opt.value);
    } else {
      newValue.splice(newValue.indexOf(opt.value), 1);
    }
    return this.props.input.onChange(newValue);
  };
  render() {
    const {
      input,
      options,
      label,
      fullWidth,
      margin,
      meta: { touched, error },
      disabled
    } = this.props;
    return (
      <FormControl
        component="fieldset"
        fullWidth={fullWidth}
        margin={margin}
        error={!!(touched && error)}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options
            ? options.map((opt, i) => (
                <FormControlLabel
                  disabled={disabled}
                  key={"label" + i}
                  label={opt.label}
                  control={
                    <Checkbox
                      checked={input.value.indexOf(opt.value) !== -1}
                      onChange={this.handleChange(opt)}
                      value={opt.value}
                    />
                  }
                />
              ))
            : []}
        </FormGroup>
        <FormHelperText style={{ margin: 0 }}>
          {touched && error ? error : " "}
        </FormHelperText>
      </FormControl>
    );
  }
}

CustomCheck.propTypes = {
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
export default CustomCheck;
