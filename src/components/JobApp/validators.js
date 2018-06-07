
export const validateRequired = value => (value ? undefined : "Required");
export const validateEmail = value =>
  value && !/^([\d\w]+[\.\w\d]*)\+?([\w\d\.]*)?@([\w\d]*\.)?upenn\.edu$/i.test(value) // eslint-disable-line no-useless-escape
    ? "Invalid UPenn email address"
    : undefined;
export const validatePhone = value =>
  value && value.replace(/[^\d]/g, "").length < 10
    ? "Invalid phone number, must be 10 digits"
    : undefined;