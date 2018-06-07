import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import { MuiThemeProvider } from "material-ui/styles";
import { Provider, connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { customMuiTheme } from "./style";
import { getProfile } from "../actions/profileActions";
import { loadText } from "../actions/loadText";
import Home from "./Home";
import Snack from "./common/Snack";
import AppBar from "./common/AppBar";
import HelpDialog from "./common/HelpDialog";
import JobApp from "./JobApp/AppContainer";
import {WELCOME} from "../config"
//checkout react-loadable

class App extends React.Component {
  state = {
    showHelp: false
  };

  componentWillMount() {
    this.props.getProfile();
    fetch(`/api/text`, { credentials: "same-origin" })
      .then(res => res.json())
      .then(json => this.props.loadText(json));
    const preload = document.getElementById("preload");
    const appDiv = document.getElementById("app");
    if (preload) {
      preload.classList.add("fade");
      appDiv.classList.add("fadeIn");
      setTimeout(() => {
        preload.innerHTML = "";
      }, 500);
    }
  }

  showHelp = () => {
    this.setState({ showHelp: true });
  };

  hideHelp = () => {
    this.setState({ showHelp: false });
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <MuiThemeProvider theme={customMuiTheme}>
            <AppBar isLoggedIn={!!this.props.loggedIn} onHelp={this.showHelp} />
            <div className="page">
              {this.props.loggedIn ? (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/:appName/:pg?" component={JobApp} />
                </Switch>
              ) : (
                <div style={{ flexGrow: 1 }}>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={10} md={6} lg={4}>
                      <Typography variant="headline">
                       {WELCOME}
                      </Typography>
                      <Typography variant="body2">
                        Please login to view available job postings.
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
            <HelpDialog
              open={this.state.showHelp}
              helpMessage={this.props.helpMsg}
              handleClose={this.hideHelp}
            />
            <Snack />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  getProfile: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool
};
const mapStateToProps = state => ({
  loggedIn: state.profile.loggedIn,
  helpMsg: state.meta.text
    ? state.meta.text.HELP_MESSAGE
    : `If you have questions or run into any problems using this application, <a href='mailto:rescomp@upenn.edu?subject=CH%20Job%20Applications'>please email us</a>.`
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
  loadText: text => dispatch(loadText(text))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
