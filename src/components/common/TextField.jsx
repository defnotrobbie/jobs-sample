import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import { Field } from "redux-form";
import Typography from "material-ui/Typography";

const CustomTextField = ({ input, label, meta: { touched, error }, ...rest }) => {
  if (label.length > 44 || rest.multiline)
    return (
      <>
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
          {`${label}${rest.required ? "*" : ""}`}
        </Typography>
        <TextField
          helperText={touched && error ? error : " "}
          error={Boolean(touched && error)}
          {...input}
          {...rest}
          style={{ marginTop: 8 }}
        />
      </>
    );
  else
    return (
      <TextField
        helperText={touched && error ? error : " "}
        error={Boolean(touched && error)}
        label={label}
        {...input}
        {...rest}
      />
    );
};
CustomTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};
// const CustomTextField = props => {
//   return <Field {...props} component={renderTextField} />;
// };

export default CustomTextField;
