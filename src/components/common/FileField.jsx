import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel, FormHelperText } from "material-ui/Form";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import FileUpload from "material-ui-icons/FileUpload";
import Done from "material-ui-icons/Done";
import ErrorOutline from "material-ui-icons/ErrorOutline";

import { connect } from "react-redux";
import { submitResume } from "../../actions/appActions";

const DOC_TYPES =
  "application/pdf,application/msword,text/plain,text/html," +
  "application/rtf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

class AsyncFileInput extends React.Component {
  state = { success: false, submitAttempted: false, error: "" };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.submitting && this.props.submitting && !nextProps.success)
      this.setState({ success: false });
    if (!nextProps.submitting && this.props.submitting && nextProps.success)
      this.setState({ success: true });
    if (!nextProps.submitting && this.props.submitting)
      this.setState({ submitAttempted: true });
  }

  handleFileChange = handler => ({ target: { files } }) => {
    const formData = new FormData();
    formData.append("resume", files[0]);
    // this.props.upload(this.props.id, formData);
    this.setState({ submitting: true });
    fetch(`/api/application/${this.props.id}/resume`, {
      method: "post",
      body: formData,
      credentials: "same-origin"
    })
      .then(res => {
        if (res.status === 415)
          this.setState({
            error: "Only Word, PDF, and plain text file formats accepted."
          });
        else if (res.status >= 500)
          this.setState({ error: "Server is experiencing problems." });
        if (res.status !== 200)
          this.setState({
            status: res.status,
            submitting: false,
            submitAttempted: true,
            success: false
          });
        else
          this.setState({
            submitting: false,
            submitAttempted: true,
            success: true
          });
        return res.json();
      })
      .then(json => {
        handler({
          // file: files[0],
          originalName: files[0].name,
          name: json.file
        });
      })
      .catch(error => {
        this.setState({
          submitting: false,
          submitAttempted: true,
          success: false
        });
        console.error(error);
      });
  };

  render() {
    const {
      input: { value: omitValue, onChange, onBlur, ...inputProps },
      meta: omitMeta,
      fullWidth: omitWidth,
      upload,
      ...props
    } = this.props;
    return (
      <FormControl
        component="fieldset"
        // fullWidth={fullWidth}
        margin={props.margin}
        error={
          !!(props.touched && omitMeta.error) ||
          (this.state.submitAttempted && !this.state.success)
        }
      >
        <FormLabel component="legend" style={{marginBottom:5}}>{props.label}</FormLabel>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            disabled={this.props.submitting || this.props.disabled }
            variant="raised"
            component="label"
            color="primary"
          >
            <FileUpload />
            {omitValue ? omitValue.originalName : "Upload"}
            <input
              onChange={this.handleFileChange(onChange)}
              onBlur={this.handleFileChange(onBlur)}
              style={{ display: "none" }}
              type="file"
              accept={DOC_TYPES}
              {...inputProps}
              {...props}
            />
          </Button>
          {this.state.submitAttempted &&
            (this.state.success ? (
              <Done style={{ color: "green" }} />
            ) : (
              <ErrorOutline style={{ color: "#f44336" }} />
            ))}
          {this.props.submitting && <CircularProgress />}
        </div>
        <FormHelperText>
          {/* {props.touched && omitMeta.error ? omitMeta.error : " "} */}
          {props.touched && omitMeta.error ? omitMeta.error : ""}
          {!this.state.success &&
            this.state.submitAttempted &&
            `File upload failed. ${this.state.error}`}
        </FormHelperText>
      </FormControl>
    );
  }
}
AsyncFileInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  id: PropTypes.number.isRequired,
  submitting: PropTypes.bool,
  success: PropTypes.bool
};

const mapStateToProps = state => ({
  id: state.meta.id,
  submitting: state.meta.fileSubmitting,
  success: state.meta.fileSuccess
});

const mapDispatchToProps = dispatch => ({
  upload: resumeObj => dispatch(submitResume(resumeObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(AsyncFileInput);
