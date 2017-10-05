import {callAtInterval, delay} from './utils';
export const TICK = 'TIMERS/TICK';
export const INIT = 'TIMERS/INIT';
export const PAUSE = 'TIMERS/PAUSE';
export const REGISTER_CANCELLER = 'TIMERS/REGISTER_CANCELLER';

export const tick = ({id}) => ({type: TICK, payload: {id}});

export const initTimer = ({id, seconds}) => ({
  type: INIT,
  payload: {id, seconds}
});

export const pause = ({id}) => ({type: PAUSE, payload: {id}});

export const registerCanceller = ({id, cancel}) => ({type: REGISTER_CANCELLER, payload: {id, cancel}});

// if needed we also have access to the store with thunks, the second argument injected with dispatch
export const startTimer = ({id, seconds, waitTime = 0}) => dispatch => {
  const doTicks = callAtInterval(seconds, () => dispatch(tick({id})));
  delay(waitTime, () => dispatch(registerCanceller({id, cancel: doTicks.cancel})));
  return doTicks;
};

