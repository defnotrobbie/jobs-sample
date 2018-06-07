import {
  SAVE_APP_REQUEST,
  SAVE_APP_FAILURE,
  SAVE_APP_SUCCESS,
  SUBMIT_APP_REQUEST,
  SUBMIT_APP_FAILURE,
  SUBMIT_APP_SUCCESS,
  SUBMIT_RESUME_REQUEST,
  SUBMIT_RESUME_FAILURE,
  SUBMIT_RESUME_SUCCESS,
  CONNECTION_STATUS
} from "../actions/appActions";

import { LOAD_TEXT } from "../actions/loadText";

import {
  FETCH_APP_REQUEST,
  FETCH_APP_FAILURE,
  FETCH_APP_SUCCESS
} from "../actions/loadApp";
import {
  FETCH_APPS_REQUEST,
  FETCH_APPS_FAILURE,
  FETCH_APPS_SUCCESS
} from "../actions/loadApps";
const initialState = {
  online: true,
  loading: true,
  loadingApp: true
};
import { LOAD_ANSWERS } from "../actions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEXT:
      return { ...state, text: action.text };
    case CONNECTION_STATUS:
      return { ...state, online: action.isOnline };
    case SAVE_APP_REQUEST:
      return { ...state, saving: true };
    case SAVE_APP_FAILURE:
      return { ...state, saving: false, saved: false };
    case SAVE_APP_SUCCESS:
      return { ...state, saving: false, saved: true, savedAt: new Date() };
    case SUBMIT_RESUME_REQUEST:
      return { ...state, fileSubmitting: true };
    case SUBMIT_RESUME_FAILURE:
      return { ...state, fileSubmitting: false, fileSuccess: false };
    case SUBMIT_RESUME_SUCCESS:
      return { ...state, fileSubmitting: false, fileSuccess: true };
    case FETCH_APPS_REQUEST:
      return { ...state, loading: true };
    case FETCH_APPS_FAILURE:
      return { ...state, loading: false };
    case FETCH_APPS_SUCCESS:
      return { ...state, loading: false, apps: action.apps };
    case LOAD_ANSWERS:
      return { ...state, initData: action.answers };
    case FETCH_APP_REQUEST:
      return { ...state, loadingApp: true };
    case FETCH_APP_FAILURE:
      return { ...state, loadingApp: false, error: action.error };
    case FETCH_APP_SUCCESS:
      return { ...state, ...action.appPayload, loadingApp: false };
    case SUBMIT_APP_REQUEST:
      return { ...state, ...action.appPayload, submittingApp: action.id };
    case SUBMIT_APP_SUCCESS:
      return {
        ...state,
        submitAppSuccess: action.id,
        submittingApp: undefined
      };
    case SUBMIT_APP_FAILURE:
      return {
        ...state,
        submitAppSuccess: undefined,
        submittingApp: undefined
      };
    case "CLEANUP":
      return { ...initialState, online: state.online, text: state.text };
    default:
      return state;
  }
};

export default reducer;
