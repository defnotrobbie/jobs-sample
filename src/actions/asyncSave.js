import {
  store
} from "../";
import {
  SAVE_APP_SUCCESS,
  SAVE_APP_FAILURE,
  SAVE_APP_REQUEST
} from "./appActions";
// import { SubmissionError } from "redux-form";

let timer

function saveTimer(func) {
  window.clearTimeout(timer)
  let promise = new Promise(function (resolve, reject) {
    timer = window.setTimeout(() => {
      resolve(true);
    }, 500);
  });
  return promise;
}



const save = (values, dispatch, props) => {
  const {
    id,
    completed
  } = store.getState().meta;
  if (completed) return new Promise(() => true);
  const req = new Request(`/api/application/${id}`, {
    body: JSON.stringify(values),
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  });




  return saveTimer().then(() => {
    dispatch({
      type: SAVE_APP_REQUEST,
      id
    });

    return fetch(req)
      .then(res => res.json())
      .then(json => {
        if (json && json.STATUS && json.STATUS === "ok") {
          dispatch({
            type: SAVE_APP_SUCCESS,
            id
          });
          return true;
        } else throw {
          _error: "Update error."
        };
      })
      .catch(error => {
        dispatch({
          type: SAVE_APP_FAILURE,
          id,
          error: error.message
        });
        throw {
          _error: "No connection to server."
        };
      });
  })
};

export default save;