import React from "react";
import { Field } from "redux-form";

import TextField from "../common/TextField";
import OptionField from "../common/OptionField";
import { normalizePhone } from "./normalizers";
import { validateRequired, validateEmail, validatePhone } from "./validators";
import FileField from "../common/FileField";
import DescriptionField from "../common/DescriptionField";
const inputType = type => {
  type = type.toLowerCase();
  if (type.includes("email")) return { type: "email", autoComplete: "email" };
  if (type.includes("zip")) return { autoComplete: "postal-code" };
  if (type.includes("address")) return { autoComplete: "address-line1" };
  if (type.includes("city")) return { autoComplete: "address-level2" };
  if (type.includes("state")) return { autoComplete: "address-level1" };
  if (type.includes("phone")) return { type: "tel", autoComplete: "tel" };
  if (type.includes("last name")) return { autoComplete: "family-name" };
  if (type.includes("first name")) return { autoComplete: "given-name" };
};

const Fields = props =>
  props.questions[props.page].map((q, i) => {
    const type = inputType(q.label);
    const reqd = [];
    if (q.required) reqd.push(validateRequired);
    if (q.label.toLowerCase().includes("email")) reqd.push(validateEmail);
    if (q.label.toLowerCase().includes("phone")) reqd.push(validatePhone);

    const bundledProps = {
      id: q.id,
      name: q.id,
      required: !!q.required,
      disabled: props.disabled,
      label: q.label,
      fullWidth: true,
      margin: "normal",
      validate: props.disabled ? undefined : reqd,
      key: `${props.page}-${i}`,
      normalize: q.label.toLowerCase().includes("phone")
        ? normalizePhone
        : undefined
    };
    switch (q.type) {
      case "TEXT":
        return <Field {...bundledProps} {...type} component={TextField} />;
      case "TEXTAREA":
        return <Field multiline {...bundledProps} component={TextField} />;
      case "DOC_UPLOAD":
        return <Field {...bundledProps} component={FileField} />;
      case "SELECT":
        return <OptionField isSelect {...bundledProps} options={q.options} />;
      case "RADIO":
        return <OptionField {...bundledProps} options={q.options} />;
      case "CHECK":
        return <OptionField isCheck {...bundledProps} options={q.options} />;
      case "DESCRIPTION":
        return <DescriptionField label={q.label} />;
      default:
        return "";
      // return <div className="empty-field"/>;
    }
  });

export default Fields;
