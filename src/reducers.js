import {combineReducers} from 'redux';
import {TICK, INIT, CHANGE_COLOR, REGISTER_CANCELLER, PAUSE} from './actions';
/***
 * Reducer
 * making sure you don't mutate state inside the reducer
 * @param state
 * @param action
 */

// While switch statements have become the most common way to handle actions,
// it is not the only see http://redux.js.org/docs/faq/Reducers.html#reducers-use-switch

const colors = (state = {background: '#fff'}, action) => {
  switch (action.type) {
    case CHANGE_COLOR: {
      return {
        [action.payload.key]: action.payload.color
      };
    }
    default:
      return state;
  }
};

const timers = (state = {}, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        [action.payload.id]: {seconds: action.payload.seconds, active: false}
      };
    case REGISTER_CANCELLER:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          cancel: action.payload.cancel,
          active: true
        }
      };
    case TICK:
      const timer = state[action.payload.id];
      const seconds = --timer.seconds;
      return {
        ...state,
        [action.payload.id]: {...timer, seconds, active: seconds > 0}
      };
    case PAUSE:
      return {
        ...state,
        [action.payload.id]: {...state[action.payload.id], active: false}
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
  timers,
  colors
});

export default reducer;
