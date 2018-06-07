import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore() {
  const storeFcn = () => {
    if (process.env.NODE_ENV === "development")
      return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        // applyMiddleware(thunkMiddleware, middleware)
        applyMiddleware(thunkMiddleware)
      );
    else {
      return createStore(rootReducer, applyMiddleware(thunkMiddleware));
    }
  };
  const store = storeFcn();
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const newReducer = require("./reducers").default;
      store.replaceReducer(newReducer);
    });
  }
  return store;
}
