import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducers';
import Countdown from './Countdown';
import registerServiceWorker from './registerServiceWorker';

//allows asynchronous actions
const middleware = [];
const enhancers = [];
//install chrome extension for the redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

ReactDOM.render(
  <Countdown {...store.getState()} />,
  document.getElementById('root')
);

registerServiceWorker();
