import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import {BRAND, HELP} from "../../config"

const HelpDialog = ({ open, helpMessage, handleClose }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="help-title"
    aria-describedby="help-description"
  >
    <DialogTitle id="help-title">{BRAND} job help</DialogTitle>
    <DialogContent>
      <DialogContentText id="help-description">
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: HELP }}
        />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Dismiss
      </Button>
    </DialogActions>
  </Dialog>
);
export default HelpDialog;
