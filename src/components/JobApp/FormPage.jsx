import React from "react";
import PropTypes from "prop-types";
import Fade from "material-ui/transitions/Fade";
import Grid from "material-ui/Grid";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import asyncSave from "../../actions/asyncSave";
import Fields from "./Fields";
let FormPage = props => (
  <Fade key={props.page} in={!props.loading}>
    <Grid container>
      <Grid item xs={12}>
        <form onSubmit={props.handleSubmit} id="questions" key={`page-${props.page}`}>
          <Fields questions={props.questions} disabled={props.disabled} page={props.page} />
        </form>
      </Grid>
    </Grid>
  </Fade>
);

FormPage.propTypes = {
  questions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

FormPage = reduxForm({
  destroyOnUnmount: false,
  asyncValidate: asyncSave,
  forceUnregisterOnUnmount: true,
  shouldAsyncValidate: ({ trigger, pristine, initialized }) => {
    switch (trigger) {
      case "blur":
      case "change":
        return true;
      default:
        return false;
    }
  }
})(FormPage);

FormPage = connect(state => {
  return {
    initialValues: state.meta.answers
  };
}, null)(FormPage);

export default FormPage;
