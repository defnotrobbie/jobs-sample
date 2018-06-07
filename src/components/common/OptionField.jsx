import React from "react";
import PropTypes from "prop-types";

import { Field } from "redux-form";
import CustomSelect from "./Select";
import CustomRadio from "./Radio";
import CustomCheck from "./Check";

const OptionField = props => {
  const { label, isCheck, isSelect, ...rest } = props;
  let component;
  if (isSelect) component = CustomSelect;
  else if (isCheck) component = CustomCheck;
  else component = CustomRadio;
  if (isCheck)
    return <Field label={label} component={component} options={rest.options} {...rest} />;

  return <Field label={label} component={component} {...rest} />;
};
OptionField.propTypes = {
  label: PropTypes.string.isRequired,
  isSelect: PropTypes.bool,
  isCheck: PropTypes.bool
};

export default OptionField;
