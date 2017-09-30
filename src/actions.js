import {generateTicks, delay} from './utils';
export const TICK = 'TIMERS/TICK';
export const INIT = 'TIMERS/INIT';

export const tick = ({id}) => ({type: TICK, payload: {id}});

export const initTimer = ({id, seconds}) => ({
  type: INIT,
  payload: {id, seconds}
});

// if needed we also have access to the store with thunks, the second argument injected with dispatch
export const startTimer = ({id, seconds, waitTime = 0}) => dispatch => {
  return delay(waitTime, () => generateTicks(() => dispatch(tick({id})), seconds))
};
