import { SubmissionError } from "redux-form";

export const LOAD_ANSWERS = "LOAD_ANSWERS";
export const CLEANUP = "CLEANUP";
export const SUBMIT_APP_FAILURE = "SUBMIT_APP_FAILURE";
export const SUBMIT_APP_SUCCESS = "SUBMIT_APP_SUCCESS";
export const SUBMIT_APP_REQUEST = "SUBMIT_APP_REQUEST";
export const SUBMIT_RESUME_FAILURE = "SUBMIT_RESUME_FAILURE";
export const SUBMIT_RESUME_SUCCESS = "SUBMIT_RESUME_SUCCESS";
export const SUBMIT_RESUME_REQUEST = "SUBMIT_RESUME_REQUEST";
export const SAVE_APP_REQUEST = "SAVE_APP_REQUEST";
export const SAVE_APP_FAILURE = "SAVE_APP_FAILURE";
export const SAVE_APP_SUCCESS = "SAVE_APP_SUCCESS";
export const CONNECTION_STATUS = "CONNECTION_STATUS";

export const loadAnswers = answers => ({ type: LOAD_ANSWERS, answers });
export const cleanupMeta = answers => ({ type: CLEANUP });

export const setConnectionStatus = isOnline => ({
  type: CONNECTION_STATUS,
  isOnline
});
const DOC_TYPES =
  "application/pdf,application/msword,text/plain,text/html," +
  "application/rtf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const submit = (id, values) => {
  return dispatch => {
    dispatch({ type: SUBMIT_APP_REQUEST, id });

    const req = new Request(`/api/application/${id}`, {
      body: JSON.stringify(values),
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      }
    });
    return fetch(req)
      .then(res => {
        if (res.status !== 200) {
          dispatch({ type: SUBMIT_APP_FAILURE, id });
          throw new SubmissionError({
            _error: res.status + " Submission Failed"
          });
        } else {
          dispatch({ type: SUBMIT_APP_SUCCESS, id });
          return true;
        }
      })
      .catch(error => {
        dispatch({ type: SUBMIT_APP_FAILURE, id, error: error.message });
        throw new SubmissionError({ _error: error.message });
      });
  };
};

export const submitResume = (id, formData) => {
  return dispatch => {
    dispatch({ type: SUBMIT_RESUME_REQUEST });
    return fetch(`/api/application/${id}/resume`, {
      method: "post",
      body: formData,
      credentials: "same-origin"
    })
      .then(res => {
        if (res.status !== 200) {
          dispatch({ type: SUBMIT_RESUME_FAILURE });
          throw new Error({
            error: res.status + " Submission Failed"
          });
        } else dispatch({ type: SUBMIT_RESUME_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: SUBMIT_RESUME_FAILURE, error: error.message });
        throw new Error({ error: error.message });
      });
  };
};

export const save = (id, values) => {
  const req = new Request(`/api/application/${id}`, {
    body: JSON.stringify(values),
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  });
  return dispatch => {
    dispatch({ type: SAVE_APP_REQUEST, id });
    return fetch(req)
      .then(res => res.json())
      .then(json => {
        if (json && json.STATUS && json.STATUS === "ok") {
          dispatch({ type: SAVE_APP_SUCCESS, id });
          return true;
        } else throw new SubmissionError({ _error: "Update error" });
      })
      .catch(error => {
        dispatch({ type: SAVE_APP_FAILURE, id, error: error.message });
        // console.log(error);
        throw { _error: "No connection" };
      });
  };
};
