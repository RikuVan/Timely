import R from 'ramda';

function _padNumber(num, pad) {
  const str = `${num}`;
  return pad.substring(0, pad.length - str.length) + str;
}

export const formatTime = date =>
  R.compose(
    R.join(''),
    R.append(`.${_padNumber(date.getTime() % 100, '00')}`),
    R.join(':'),
    R.map(x => _padNumber(x, '00'))
    )([date.getHours(), date.getMinutes(), date.getSeconds()]);
