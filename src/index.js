import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//allows asynchronous actions
const middleware = [thunk];
const enhancers = [];
//install chrome extension for the redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
