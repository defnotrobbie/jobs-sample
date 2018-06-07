import React from "react";
import PropTypes from "prop-types";
// import moment from "moment";
import Typography from "material-ui/Typography";
import { connect } from "react-redux";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const componentStyle = {
  borderRadius: 3,
  padding: "3px 3px 0 3px",
  transition: "background-color ease-out 1000ms",
  // transition: "background-color cubic-bezier(0.4, 0, 0.2, 1) 500ms",
  color: "#44464b"
};
class SavedIndicator extends React.Component {
  state = {
    show: false,
    saveFail: false,
    saving: this.props.saving
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ savedAt: nextProps.savedAt });
    if (!nextProps.saving && this.state.saving && !nextProps.saved)
      this.setState({ saveFail: true, show: true });
    else if (!nextProps.saving && this.state.saving && nextProps.saved)
      this.setState({ saveFail: false, show: true });

    if (nextProps.saving === true) {
      this.setState({ saving: true, show: true });
      sleep(1000).then(() => this.setState({ saving: false }));
    }
  }

  render() {
    const { savedAt, style } = this.props;
    let msg;
    if (this.state.saving) msg = "Saving...";
    else if (this.state.saveFail) msg = "Failed to save";
    else if (savedAt)
      msg = `Last saved ${savedAt.toLocaleString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit"
      })}`;
    else
      // msg = `Last saved ${moment(savedAt).format("h:mm A MMM D")}`;
      msg = "";
    return (
      <Typography
        style={{
          ...componentStyle,
          ...style,
          ...{ display: this.state.show ? "block" : "none" },
          ...{ backgroundColor: this.state.saving ? "#f2c100" : "" }
        }}
        variant="caption"
      >
        {msg}
      </Typography>
    );
  }
}
SavedIndicator.propTypes = {
  saving: PropTypes.bool,
  savedAt: PropTypes.object,
  saved: PropTypes.bool,
  style: PropTypes.object
};

const mapStateToProps = state => ({
  savedAt: state.meta.savedAt,
  saving: state.meta.saving,
  saved: state.meta.saved
});
export default connect(mapStateToProps, null)(SavedIndicator);
