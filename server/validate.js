const validate = (app, userResponse) => {
  const qs = app.QUESTIONS;
  let valid = true;
  qs.forEach(q => {
    const userQ = userResponse[q.id];
    if (q.required && q.type !== "PAGEBREAK" && (userQ === undefined || userQ === "")) {
      valid = false;
    }
    //  else if (userQ === undefined && q.type !== "PAGEBREAK")
  });
  return valid;
};

module.exports = validate;
