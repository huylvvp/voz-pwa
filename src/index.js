import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { initializeFirebase } from './pushNotification';
import {loadState,saveState} from './services/redux2local';
import {throttle} from 'lodash';

const persistedState = loadState();
const store = createStore(reducer, persistedState, applyMiddleware(thunk));
store.subscribe(throttle(() => {
  saveState({
    ...store.getState(),
    layout: {
      ...store.getState().layout,
      data: {
        ...store.getState().layout.data,
        thread: {},
      }
    }
  });
}, 2000));

initializeFirebase();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.');
  }
});

navigator.serviceWorker.addEventListener("message", (message) => console.log(message));

