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
  const state = store.getState();
  const timers = R.propOr({}, 'timers', state);
  const color = R.path(['colors', 'background'], state);

  const lowestTime = Object.keys(timers)
    .filter(key => timers[key].active)
    .reduce((time, key) => {
      const seconds = timers[key].seconds;
      return seconds < time ? seconds : time;
    }, 100);

  if (action.type === TICK) {
    if (
      lowestTime >= 0 &&
      lowestTime <= 10 &&
      color !== countdownColors[lowestTime]
    ) {
      store.dispatch(
        changeColor({key: 'background', color: countdownColors[lowestTime]})
      );
    }
  }

  if (action.type === INIT) {
    if (lowestTime > 10 && color !== DEFAULT_BACKGROUND) {
      store.dispatch(
        changeColor({key: 'background', color: DEFAULT_BACKGROUND})
      );
    }
  }
  next(action);
};

export default colorMiddleware;
