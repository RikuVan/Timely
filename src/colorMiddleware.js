import {changeColor} from './actions';
import {lightenDarkenColor} from './utils';
import {TICK, INIT} from './actions';
import R from 'ramda';

const ALERT_COLOR = '#dc3545';
const DEFAULT_BACKGROUND = '#fff';

const countdownColors = Array.from(Array(11).keys())
  .map(i => {
    return lightenDarkenColor(ALERT_COLOR, -i * 20);
  })
  .reverse();

const colorMiddleware = store => next => action => {

  // here we can check if a certain action was called and dispatch a new action
  // if (action.type === SOME_ACTION) {
  //   do something here
  // }

  //if we don't call next(action) our action will dispatched action will never update the reducer
  // which sometimes may be desired behaviour (not usually)
  //next(action);
};

export default colorMiddleware;
