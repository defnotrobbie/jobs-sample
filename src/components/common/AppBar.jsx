import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import { Link } from "react-router-dom";
import Feedback from "material-ui-icons/Feedback";
import HelpOutline from "material-ui-icons/HelpOutline";
import IconButton from "material-ui/IconButton";
import { connect } from "react-redux";

import { login, logout } from "../../actions/profileActions";
import { BRAND_IMG, BRAND } from "../../config";
const HeaderAppBar = props => (
  <AppBar position="static" color="primary">
    <Toolbar style={{ padding: 0 }}>
      <Grid container spacing={0} justify="center">
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          item
          xs={12}
          sm={10}
          md={6}
        >
          <Grid item>
            <div>
              <Link to="/">
                <img
                  src={`/${BRAND_IMG}`}
                  style={{
                    verticalAlign: "middle",
                    height: 48,
                    width: "auto",
                    textAlign: "center"
                  }}
                  alt={`${BRAND} brand image`}
                />
              </Link>
            </div>
          </Grid>
          <Grid item>
            <Typography variant="headline" color="inherit" style={{ flex: 1 }}>
              {BRAND}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton alt="Help" onClick={props.onHelp}>
              <HelpOutline alt="Help" style={{ color: "white" }} />
            </IconButton>

            {!props.isLoggedIn && (
              // <Button color="inherit" href="/login">
              <Button color="inherit" onClick={props.login}>
                Login
              </Button>
            )}
            {props.isLoggedIn && (
              // <Button color="inherit" href="/logout">
              <Button color="inherit" onClick={props.logout}>
                {/* <Button color="inherit" href="https://weblogin.pennkey.upenn.edu/logout"> */}
                Logout
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

HeaderAppBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  logout: () => dispatch(logout())
});

// export default HeaderAppBar;
export default connect(
  null,
  mapDispatchToProps
)(HeaderAppBar);
