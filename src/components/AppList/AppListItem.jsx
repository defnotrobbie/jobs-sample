import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "material-ui/List";

import { Link } from "react-router-dom";

const AppListItem = props => {
  const { app, showTime } = props;
  const dtOpt = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  };
  app.TITLE = app.TITLE ? app.TITLE : "";
  return (
    <ListItem
      button
      component={Link}
      to={{
        pathname: `/${app.ID}_${String(app.TITLE).replace(/ +/g, "-").toLowerCase()}`,
        state: { name: app.TITLE }
      }}
    >
      <ListItemText
        primary={app.TITLE}
        secondary={
          showTime &&
          new Date(
            app.MODIFIED !== "" ? app.MODIFIED : app.CREATED
          ).toLocaleString("en-US", dtOpt)
        }
      />
    </ListItem>
  );
};

AppListItem.propTypes = {
  showTime: PropTypes.bool,
  app: PropTypes.shape({
    TITLE: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string
  }).isRequired
};

export default AppListItem;
