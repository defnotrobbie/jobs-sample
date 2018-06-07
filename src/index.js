import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import configureStore from "./configureStore";

export const store = configureStore();

const renderApp = () => {
  const App = require("./components/App").default;
  render(<App store={store} />, document.getElementById("app"));
};

if (module.hot) {
  module.hot.accept("./components/App", () => renderApp());
}

renderApp();

// render(
//   <App store={store} />,
//   document.getElementById('app')
// );