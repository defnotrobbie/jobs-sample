import regeneratorRuntime from "regenerator-runtime";

export const PAGEBREAK = "PAGEBREAK";
export const FETCH_APP_REQUEST = "FETCH_APP_REQUEST";
export const FETCH_APP_FAILURE = "FETCH_APP_FAILURE";
export const FETCH_APP_SUCCESS = "FETCH_APP_SUCCESS";

export const loadApp = id => {
  return dispatch => {
    dispatch({ type: FETCH_APP_REQUEST, id });
    return fetch(`/api/application/${id}`, {
      credentials: "same-origin"
    })
      .then(res => {
        if (res.status < 400) return res.json();
        else
          throw new Error(
            `${res.status}: Could not access Application with ID ${id}`
          );
      })
      .then(json => dispatch(processPayload(json)))
      .catch(error => {
        dispatch({
          type: FETCH_APP_FAILURE,
          id,
          error: "Error loading application",
          originalError: error.message
        });
        // throw new SubmissionError({ _error: "Could not load appliction with id " + id });
      });
  };
};

const processForm = async form => {
  let pagedForm = [];
  let startI = 0;
  let i;
  const optionsStore = {};
  for (i = 0; i < form.length; i++) {
    if (form[i].options && typeof form[i].options === "string") {
      if (optionsStore[form[i].options] === undefined) {
        const { options } = await fetch(form[i].options).then(res =>
          res.json()
        );
        optionsStore[form[i].options] = options;
        form[i].options = options;
      } else {
        form[i].options = optionsStore[form[i].options];
      }
    }
  }
  const findBr = el => el.type === PAGEBREAK;
  if (form.find(findBr)) {
    for (i = 0; i < form.length; i++) {
      if (form[i].type === PAGEBREAK) {
        pagedForm.push(form.slice(startI, i));
        startI = i + 1;
      }
    }
    pagedForm.push(form.slice(startI));
  } else pagedForm.push(form);
  return pagedForm;
};

const processAnswers = payload => {
  const { QUESTIONS: form, userAppData } = payload;
  let currentAnswers;
  if (!userAppData || payload.ID !== userAppData.FORMID) currentAnswers = {};
  else currentAnswers = userAppData.RESPONSE;
  const answers = {};
  let i;
  for (i = 0; i < form.length; i++) {
    const answer = currentAnswers[form[i].id];
    if (form[i].type !== PAGEBREAK && answer !== undefined)
      answers[form[i].id] =
        Array.isArray(answer) || typeof answer === "object"
          ? answer
          : answer.toString();
  }
  return answers;
};

const processPayload = payload => {
  return async dispatch => {
    dispatch({
      type: FETCH_APP_SUCCESS,
      appPayload: {
        loadingApp: false,
        id: payload.APPID,
        completed: Boolean(
          payload.userAppData && payload.userAppData.COMPLETED
        ),
        description: payload.DESCRIPTION,
        form: await processForm(payload.QUESTIONS),
        name: payload.APPLICATIONNAME,
        answers: processAnswers(payload)
      }
    });
  };
};
