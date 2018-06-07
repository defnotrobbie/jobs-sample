import React from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

import { connect } from "react-redux";
import { submit } from "redux-form";

const SubmitDialog = props => (
  <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Confirm Submission</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Changes may not be made after the application has been submitted. Applications may still be viewed after submission.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Cancel
      </Button>
      <Button
        onClick={props.handleSubmit(props.name)}
        color="primary"
        autoFocus
      >
        Submit
      </Button>
    </DialogActions>
  </Dialog>
);

SubmitDialog.defaultProps = {
  open: false
};

const mapStateToProps = state => ({
  name: state.meta.name
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: name => () => {
    return dispatch(submit(name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitDialog);
