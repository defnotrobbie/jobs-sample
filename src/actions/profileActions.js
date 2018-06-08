export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const login = () => {
  return simpleProfile("/login", LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE)
}
export const logout = () => {
  return simpleProfile("/logout", LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE)
}

function simpleProfile(url, request, success, failure) {
  return dispatch => {
    dispatch({
      type: request
    })
    return fetch(url, {
      credentials: "same-origin"
      // method: "post"
    }).then(res => {
      if (res.ok) return res.blob();
      throw new Error("Server error")
    }).then(blob => {
      dispatch({
        type: success
      })
      dispatch(getProfile())
    }).catch(error => {
      console.log(error)
      dispatch({
        type: failure
      })
    })
  }
}


export const getProfile = () => {
  return dispatch => {
    dispatch({
      type: GET_PROFILE_REQUEST
    });
    return fetch("/profile", {
        credentials: "same-origin"
      })
      .then(res => {
        if (res.status === 401) {
          dispatch({
            type: GET_PROFILE_SUCCESS,
            loggedIn: false
          });
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
          dispatch({
            type: GET_PROFILE_FAILURE,
            loggedIn: false
          });
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