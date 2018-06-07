import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import metaReducer from "./metaReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  // router: routerReducer,
  profile: profileReducer,
  meta: metaReducer,
  form: formReducer
});

export default rootReducer;
