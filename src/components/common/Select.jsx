import React from "react";
import PropTypes from "prop-types";
import { InputLabel } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";
import Typography from "material-ui/Typography";
const CustomSelect = ({
  id,
  options,
  fullWidth,
  margin,
  input,
  label,
  meta: { touched, error },
  ...rest
}) => {
  // input.value = input.value.toString();
  // const shrink = label.length > 40 ? { shrink: true } : undefined;
  let labelEl;

  return (
    <FormControl fullWidth={fullWidth} margin={margin} error={!!(touched && error)}>
      {(label.length > 50 || rest.multiline) ? (
        <Typography
          variant="body1"
          style={{
            marginTop: 16,
            color: touched && error ? "#f44336" : "rgba(0, 0, 0, 0.54)",
            padding: 0,
            fontSize: "1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            lineHeight: 1
          }}
        >
          {" "}
          {`${label}${rest.required ? "*" : ""}`}
        </Typography>
      ) : (
        <InputLabel htmlFor={id}>{`${label}${rest.required ? "*" : ""}`}</InputLabel>
      )}{" "}
      <Select
        {...input}
        native
        inputProps={{
          id: id
        }}
        {...rest}
      >
        <option value="" disabled />
        {options.map((opt, i) => (
          <option key={`${id}-${i}`} value={opt.value}>
            {opt.label ? opt.label : opt.id}
          </option>
        ))}
      </Select>
      <FormHelperText>{touched && error ? error : " "}</FormHelperText>
    </FormControl>
  );
};
CustomSelect.propTypes = {
  input: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
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
export default CustomSelect;
