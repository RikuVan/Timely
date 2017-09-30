import R from 'ramda';

/**
 * Format date object into HH:MM:SS:MS
 * @param date
 */

export const formatTime = date =>
  R.compose(
    R.join(''),
    R.append(`.${padNumber(date.getTime() % 100, '00')}`),
    R.join(':'),
    R.map(x => padNumber(x, '00'))
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

/**
 * Converts seconds to hours, minutes and seconds as needed
 * @param totalSeconds
 * @returns {string}
 */

export const formatTimeFromSeconds = totalSeconds => {
  const hours = R.compose(
    maybeShow('h'),
    floor,
    R.divide(R.__, 3600)
  )(totalSeconds);

  const minutes = R.compose(
    maybeShow('m'),
    floor,
    R.divide(R.__, 60),
    R.modulo(R.__, 3600)
  )(totalSeconds);

  const seconds = R.compose(v => `${v}s`, R.modulo(R.__, 60), R.modulo(R.__, 3600))(
    totalSeconds
  );

  return `${hours}${minutes}${seconds}`;
};

/**
 * Allows us to dispatch N amount of ticks at one second intervals
 * @param action wrapped in dispatch
 * @param ticks (seconds)
 */

export const generateTicks = (action, ticks) => co(function*() {
  let t = ticks;
  while (t > 0) {
    yield delay(1000, action);
    t--
  }
});

/**
 * This is a naive helper to resolve promises in a generator and handle next/done
 * @param genFn
 * @returns {Promise}
 */

function co(genFn) {
  const p = new Promise((resolve) => {
    const iter = genFn();

    function nextIteration() {
      const result = iter.next();
      if (result.done) {
        return;
      }

      result.value.then(() => {
        nextIteration()
      })

    }
    nextIteration()
  })
  return p;
}


function padNumber(num, pad) {
  const str = `${num}`;
  return pad.substring(0, pad.length - str.length) + str;
}

function floor(v) {
  return Math.floor(v);
}
