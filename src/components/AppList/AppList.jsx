import React from "react";
import PropTypes from "prop-types";
import List, { ListSubheader } from "material-ui/List";
import AppListItem from "./AppListItem";
import Paper from "material-ui/Paper";

const ApplicationList = props => {
  {
    const { title, apps } = props;
    const style = { marginTop: 15 };
    const subhead = <ListSubheader component="div">{title}</ListSubheader>;
    return (
      <Paper style={style}>
        <List component="nav" subheader={subhead}>
          {apps.map((app, i) => <AppListItem {...props} app={app} key={i} />)}
        </List>
      </Paper>
    );
  }
};

ApplicationList.propTypes = {
  timestamp: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      status: PropTypes.string
    })
  )
};

export default ApplicationList;
