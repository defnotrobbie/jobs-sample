export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";

export const getProfile = () => {
  return dispatch => {
    dispatch({ type: GET_PROFILE_REQUEST });
    return fetch("/profile", {
      credentials: "same-origin"
    })
      .then(res => {
        if (res.status === 401) {
          dispatch({ type: GET_PROFILE_SUCCESS, loggedIn: false });
        } else if (res.status === 200) {
          res
            .json()
            .then(json =>
              dispatch({
                type: GET_PROFILE_SUCCESS,
                loggedIn: true,
                profile: json
              })
            );
        } else {
          dispatch({ type: GET_PROFILE_FAILURE, loggedIn: false });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_PROFILE_FAILURE,
          loggedIn: false,
          error: error.message
        });
      });
  };
};
