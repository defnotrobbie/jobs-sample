import React from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import SavedIndicator from "./SavedIndicator";

//container style
// style={{
//   /*flexGrow: 1,*/ direction: "column",
//   justify: "space-between",
//   alignItems: "center",
//   flexGrow: 1,
//   flexShrink: 1,
//   flexBasis: "auto"
// }}
const Layout = props => {
  return (
    <div
      style={{
        // paddingTop: 20,
        paddingBottom: 56,
        flexGrow: 1,
        display: "flex",
        height: "100%",
        flexDirection: "column"
      }}
    >
      <div style={{ flex: "1 0 auto" }}>
        <Grid
          item
          container
          spacing={0}
          justify="center"
          style={{ flexGrow: 1 }}
          xs={12}
        >
          <Grid item xs={12} sm={10} md={6}>
            <Paper style={{ padding: 20, marginBottom: 20 }}>
              <Typography variant="title" gutterBottom>
                {props.title}
              </Typography>
              {props.page}
              {/* {props.actions} */}
            </Paper>
          </Grid>
        </Grid>
      </div>
      {props.actions && (
        <>
          <SavedIndicator
            style={{
              position: "fixed",
              // right: 0,
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 0,
              paddingRight: 5,
              paddingTop: 3,
              paddingLeft: 3,
              zIndex: 20
            }}
          />
          {/* {props.savedAt<span style={}}>saved at</span> */}
          <Paper
            style={{
              position: "fixed",
              left: 0,
              bottom: 0,
              height: 56,
              zIndex: 10,
              width: "100%",
              boxShadow: "0 0 8px rgba(0,0,0,.4)"
              // display: "flex"
            }}
          >
            <Grid
              spacing={0}
              style={{ height: 56 }}
              container
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={10} md={6}>
                {props.actions}
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </div>
  );
};
Layout.propTypes = {
  title: PropTypes.string,
  page: PropTypes.node,
  actions: PropTypes.node
  // children:PropTypes.arrayOf(PropTypes.node),
};

export default Layout;
