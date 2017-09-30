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

function _padNumber(num, pad) {
  const str = `${num}`;
  return pad.substring(0, pad.length - str.length) + str;
}

function _floor(v) {
  return Math.floor(v);
}
