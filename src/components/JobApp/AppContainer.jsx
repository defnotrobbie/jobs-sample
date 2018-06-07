import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submit } from "redux-form";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { Link, withRouter, Redirect } from "react-router-dom";
import {
  loadAnswers,
  save,
  submit as remoteSubmit,
  cleanupMeta,
  setConnectionStatus
} from "../../actions/appActions";
import { loadApp } from "../../actions/loadApp";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import DescriptionPage from "./DescriptionPage";
import FormPage from "./FormPage";
import SubmitDialog from "./SubmitDialog";
import Stepper from "./Stepper";
import Layout from "../common/Layout";
import Loading from "../common/Loading";
import regeneratorRuntime from "regenerator-runtime";

class JobApplication extends React.Component {
  state = {
    showDialog: false,
    online: true,
    id: this.props.match.params.appName.slice(
      0,
      this.props.match.params.appName.indexOf("_")
    ),
    page: this.props.match.params.pg
      ? parseInt(this.props.match.params.pg, 10)
      : "desc"
  };

  componentWillMount() {
    this.props.getApp(this.state.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.pg !== nextProps.match.params.pg) {
      window.scrollTo(0, 0);
      this.setState({
        page: nextProps.match.params.pg
          ? parseInt(nextProps.match.params.pg, 10)
          : "desc"
      });
    }
  }

  componentWillUnmount() {
    this.props.cleanupMeta();
  }

  handleDialogClose = () => {
    this.setState({ showDialog: false });
  };

  handleSubmit = (nextLink, showNext) => {
    if (showNext) return () => this.props.history.push(nextLink);
    else {
      return this.props.remoteSubmit(this.state.id);
    }
  };

  checkConnectionStatus() {
    const isOnline = navigator.onLine;
    if (this.state.online !== isOnline) {
      this.setState({ online: isOnline });
      this.props.setConnectionStatus(isOnline);
    }
  }

  handleNext = () => {
    if (this.state.page === this.props.form.length)
      this.setState({ showDialog: true });
    else this.props.submit(this.props.name);
  };

  renderFormElements(nextLink, backLink) {
    const { page } = this.state;
    const { loadingApp, form, name, completed, answers, submit } = this.props;
    const showNext = (form && page < form.length) || page === "desc";

    return {
      page: (
        <FormPage
          onSubmit={this.handleSubmit(nextLink, showNext)}
          loading={loadingApp}
          form={name}
          questions={form}
          answers={answers}
          page={page - 1}
          disabled={completed}
        />
      ),
      actions: (
        <Stepper
          steps={form.length + 1}
          step={page}
          next={
            <div>
              <Button
                color="primary"
                style={{
                  //ensure same width when content changes
                  width: 24,
                }}
                disabled={!showNext && completed}
                type="submit"
                onClick={this.handleNext}
              >
                {showNext ? (
                  <>
                    Next
                    <KeyboardArrowRight />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          }
          back={
            <Button
              style={{ paddingLeft: 0 }}
              color="secondary"
              component={Link}
              to={backLink}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      )
    };
  }

  render() {
    this.checkConnectionStatus();
    const { page } = this.state;
    const { loadingApp, form, name, completed } = this.props;
    const baseLink = `/${this.props.match.params.appName}`;
    const nextLink = `${baseLink}/${
      typeof page === "number" ? `${page + 1}` : 1
    }`;
    const backLink = `${baseLink}/${page === 1 ? `` : page - 1}`;
    const back = (
      <Button
        color="secondary"
        style={{ paddingLeft: 0 }}
        component={Link}
        to="/"
      >
        <KeyboardArrowLeft />
        Back
      </Button>
    );

    const noPage = title => ({
      page: (
        <Typography style={{ color: "red", textAlign: "center" }}>
          {title}
        </Typography>
      ),
      actions: back
    });

    const descPage = () => ({
      page: (
        <DescriptionPage loading={loadingApp} text={this.props.description} />
      ),
      actions: (
        <Stepper
          steps={form.length + 1}
          step={0}
          next={
            <Button
              color="primary"
              style={{ float: "right" }}
              component={Link}
              to={nextLink}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          back={back}
        />
      )
    });
    let activePage;
    if (loadingApp) activePage = { page: <Loading /> };
    else if (this.props.error) activePage = noPage(this.props.error);
    else if (page === "desc") activePage = descPage();
    else if (typeof page === "number" && page <= form.length)
      activePage = this.renderFormElements(nextLink, backLink);
    else activePage = noPage("Page out of bounds");
    // if (this.props.savedAt) name += ` ${Date(this.props.savedAt).toString()}`;
    if (this.props.success && !completed) return <Redirect to="/" />;
    return (
      <>
        <Layout title={name} {...activePage} savedAt={this.props.savedAt} />
        <SubmitDialog
          open={this.state.showDialog}
          onClose={this.handleDialogClose}
        />
      </>
    );
  }
}
JobApplication.defaultProps = {
  name: "",
  match: { params: { appName: undefined, pg: undefined } },
  location: { state: { name: "" } },
  loading: true
};

JobApplication.propTypes = {
  completed: PropTypes.bool,
  getApp: PropTypes.func.isRequired,
  remoteSubmit: PropTypes.func.isRequired,
  cleanupMeta: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setConnectionStatus: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  loadingApp: PropTypes.bool.isRequired,
  description: PropTypes.string,
  success: PropTypes.bool,
  error: PropTypes.object,
  savedAt: PropTypes.object,
  name: PropTypes.string,
  form: PropTypes.array,
  answers: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      appName: PropTypes.string,
      pg: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string
    })
  })
};

const mapStateToProps = state => {
  return {
    name: state.meta.name,
    completed: state.meta.completed,
    form: state.meta.form,
    // syncErrors: state.form[state.meta.name] ? state.form[state.meta.name].syncErrors : false,
    values: state.form[state.meta.name]
      ? state.form[state.meta.name].values
      : undefined,
    error: state.meta.error,
    answers: state.meta.answers,
    description: state.meta.description,
    loadingApp: state.meta.loadingApp,
    savedAt: state.meta.savedAt || undefined,
    submitting:
      state.meta.id && state.meta.submittingApp === state.meta.id.toString(),
    success:
      state.meta.id && state.meta.submitAppSuccess === state.meta.id.toString()
  };
};

const mapDispatchToProps = dispatch => ({
  load: id => dispatch(loadAnswers(id)),
  save: (id, values) => () => dispatch(save(id, values)),
  remoteSubmit: id => values => dispatch(remoteSubmit(id, values)),
  setConnectionStatus: isOnline => dispatch(setConnectionStatus(isOnline)),
  submit: name => {
    return dispatch(submit(name));
  },
  getApp: id => dispatch(loadApp(id)),
  cleanupMeta: () => dispatch(cleanupMeta())
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JobApplication)
);
