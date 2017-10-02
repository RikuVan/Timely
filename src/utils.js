import R from 'ramda';

export const formatTime = date =>
  R.compose(
    R.join(''),
    R.append(`.${_padNumber(date.getTime() % 100, '00')}`),
    R.join(':'),
    R.map(x => _padNumber(x, '00'))
  )([date.getHours(), date.getMinutes(), date.getSeconds()]);

export const delay = (ms, action = () => {}) => {
  let timeoutId;
  const promise = new Promise(resolve => {
    timeoutId = setTimeout(() => resolve(action()), ms);
  });
  promise.cancel = () => clearTimeout(timeoutId);
  return promise;
};

const maybeShow = unit => R.ifElse(R.gt(R.__, 0), v => `${v}${unit} `, R.always(''));

export const formatTimeFromSeconds = totalSeconds => {
  const hours = R.compose(
    maybeShow('h'),
    _floor,
    R.divide(R.__, 3600)
  )(totalSeconds);

  const minutes = R.compose(
    maybeShow('m'),
    _floor,
    R.divide(R.__, 60),
    R.modulo(R.__, 3600)
  )(totalSeconds);

  const seconds = R.compose(v => `${v}s`, R.modulo(R.__, 60), R.modulo(R.__, 3600))(
    totalSeconds
  );

  return `${hours}${minutes}${seconds}`;
};

/**
 * Can optionally pass delay an action wrapped in dispatch
 * @param ms
 * @param action
 * @returns {Promise}
 */

export const delay = (ms, action = () => {}) => {
  let task;
  const promise = new Promise(resolve => {
    task = setTimeout(() => resolve(action()), ms);
  });
  promise.cancel = () => clearTimeout(task);
  promise.cancel = () => clearTimeout(task);
  return promise;
};

/**
 * Can optionally pass callAtInterval an action wrapped in dispatch
 * to cancel, assign to variable and call cancel()
 * @param ms
 * @param action
 * @returns {Promise}
 */

export const callAtInterval = (s, action = () => {}) => {
  let time = s;
  let task;

  const promise = new Promise(resolve => {
    task = setInterval(() => {
      if (--time < 0) {
        clearInterval(task);
        resolve();
      } else {
        return action();
      }
    }, 1000);
  });

  promise.cancel = () => clearInterval(task);

  return promise;
};

function _padNumber(num, pad) {
  const str = `${num}`;
  return pad.substring(0, pad.length - str.length) + str;
}

function _floor(v) {
  return Math.floor(v);
}
