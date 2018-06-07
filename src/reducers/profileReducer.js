import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS
} from "../actions/profileActions";

const profileReducer = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true };
    case GET_PROFILE_FAILURE:
      return { ...state, loading: false, loggedIn: false };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: action.loggedIn,
        ...action.profile
      };
    default:
      return state;
  }
};

export default profileReducer;
