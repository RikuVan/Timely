import {combineReducers} from 'redux';
import {TICK, INIT} from './actions';
/***
 * Reducer
 * making sure you don't mutate state inside the reducer
 * @param state
 * @param action
 */

// While switch statements have become the most common way to handle actions,
// it is not the only see http://redux.js.org/docs/faq/Reducers.html#reducers-use-switch

const timers = (state = {}, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        [action.payload.id]: {seconds: action.payload.seconds}
      };
    case TICK:
      const timer = state[action.payload.id];
      return {
        ...state,
        [action.payload.id]: {...timer, seconds: --timer.seconds}
      };
    default:
      return state;
  }
};

/**
 * The name you give to each key will determine the key you select data by
 * in the redux state tree
 * @type {Reducer<S>}
 */
const reducer = combineReducers({
  timers
});

export default reducer;
