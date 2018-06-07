import partition from "lodash.partition";

export const FETCH_APPS_REQUEST = "FETCH_APPS_REQUEST";
export const FETCH_APPS_SUCCESS = "FETCH_APPS_SUCCESS";
export const FETCH_APPS_FAILURE = "FETCH_APPS_FAILURE";

const loadApps = () => {
  return dispatch => {
    dispatch({ type: FETCH_APPS_REQUEST });
    return fetch("/api/application", {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(json => dispatch(processApps(json)))
      .catch(error => {
        dispatch({ type: FETCH_APPS_FAILURE, error: error.message });
      });
  };
};

const processApps = apps => {
  const available = apps.apps.filter(
    app => !apps.userApps.find(item => item.ID === app.ID)
  );
  const splitUserApps = partition(apps.userApps, "APP_COMPLETED");
  return dispatch => {
    dispatch({
      type: FETCH_APPS_SUCCESS,
      apps: {
        available: available,
        completed: splitUserApps[0],
        inProgress: splitUserApps[1]
      }
    });
  };
};

export default loadApps;
