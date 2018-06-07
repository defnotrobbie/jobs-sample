import React from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";
import { connect } from "react-redux";
import { getFormError } from "redux-form";
// import ErrorOutline from "material-ui-icons/ErrorOutline";

class Snack extends React.Component {
  state = { show: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== undefined && nextProps.error !== "") {
      console.log(nextProps);
      this.setState({ show: true, error: nextProps.error });
    }
  }

  handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    this.setState({ show: false });
  };

  render() {
    return (
      <Snackbar
        open={this.state.show}
        onClose={this.handleClose}
        autoHideDuration={3000}
        SnackbarContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span
            style={{
              display: "inline-flex",
              alignItems: "center"
            }}
            id="message-id"
          >
            {this.state.error}
            {/* <ErrorOutline />
            <span style={{ marginLeft: 5 }}>{this.state.error}</span>*/}
          </span>
        }
      />
    );
  }
}

Snack.propTypes = {
  error: PropTypes.string
};
const mapStateToProps = state => {
  const formError = getFormError(state.meta.name)(state);
  const connectionError = "No internet connection.";
  if (!state.meta.online) return { error: connectionError };
  return { error: formError };
};
export default connect(mapStateToProps, null)(Snack);
