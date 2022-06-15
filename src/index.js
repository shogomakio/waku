import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import waku from "./store/reducers/videoReducer";
import thunk from "redux-thunk";

// store
// const store = createStore(
//   combineReducers({
//     waku,
//   }),
//   a
const store = createStore(waku, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
