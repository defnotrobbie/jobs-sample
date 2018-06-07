import React from "react";
import PropTypes from "prop-types";
import Fade from "material-ui/transitions/Fade";
import Grow from "material-ui/transitions/Grow";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import { LinearProgress } from "material-ui/Progress";
import Paper from "material-ui/Paper";

import loadApps from "../actions/loadApps";
import { connect } from "react-redux";
import ApplicationList from "./AppList";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  componentWillMount() {
    this.props.loadApps();
  }
  render() {
    const { name, completed, inProgress, available } = this.props;
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={6} lg={4}>
            <Typography variant="title">{`Welcome ${name}`}</Typography>
            <Typography variant="subheading">Your Job Applications</Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={6} lg={4} style={{ flexGrow: 1 }}>
            <Fade timeout={500} in={this.props.loading}>
              <LinearProgress />
            </Fade>
            <Grow in={!this.props.loading}>
              <div>
                {completed.length > 0 && (
                  <ApplicationList
                    showTime
                    apps={completed}
                    title="Completed"
                  />
                )}
                {inProgress.length > 0 && (
                  <ApplicationList
                    showTime
                    showStatus
                    apps={inProgress}
                    title="In Progress"
                  />
                )}
                {available.length > 0 && (
                  <ApplicationList apps={available} title="Available" />
                )}
                {completed.length === 0 &&
                  inProgress.length === 0 &&
                  available.length === 0 && (
                    <Paper style={{ marginTop: 15 }}>
                      <Typography
                        variant="body1"
                        style={{ padding: 16 }}
                        dangerouslySetInnerHTML={{
                          __html: this.props.noAppsMsg
                        }}
                      />
                    </Paper>
                  )}
              </div>
            </Grow>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Home.defaultProps = {
  noAppsMsg: (
    <Typography style={{ padding: 16 }} variant="body1">
      No applications available. If you believe you meet the criteria for CHC
      Student positions,{" "}
      <a href="mailto:rescomp@upenn.edu?subject=CH%20Job%20Applications">
        please email us
      </a>.
    </Typography>
  ),
  name: "",
  completed: [],
  inProgress: [],
  available: []
};

Home.propTypes = {
  available: PropTypes.array,
  completed: PropTypes.array,
  inProgress: PropTypes.array,
  loading: PropTypes.bool,
  new: PropTypes.array,
  name: PropTypes.string.isRequired,
  loadApps: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    ...state.meta.apps,
    noAppsMsg: state.meta.text ? state.meta.text.NO_APPS_MESSAGE : "",
    name: `${state.profile.fname} ${state.profile.lname}`,
    loading: state.meta.loading
  };
};

const mapDispatchToProps = dispatch => ({
  loadApps: () => dispatch(loadApps())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));