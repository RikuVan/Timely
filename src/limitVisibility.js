import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initTimer, startTimer} from './actions';
import {formatTimeFromSeconds} from './utils.js';
import {lightenDarkenColor} from './utils';
import R from 'ramda';

const getSeconds = R.pathOr(0, ['timers', 'visibilityTimer', 'seconds']);
const hasTime = R.compose(R.gt(R.__, 0), getSeconds);

const alertStyle = {
  backgroundColor: lightenDarkenColor('#dc3545', 40),
  padding: '10px',
  border: '1px solid #dc3545',
  borderRadius: '3px',
  fontWeight: 'bold'
};

const limitVisibility = WrappedComponent => {
  class MaybeShow extends Component {
    componentDidMount() {
      this.props.startTimer({
        id: 'visibilityTimer',
        seconds: 10
      });
    }

    render() {
      if (!this.props.showMessage) return null;
      return (
        <div>
          <WrappedComponent {...this.props} />
          <small style={alertStyle}>
            This message will self destruct in{' '}
            {formatTimeFromSeconds(this.props.seconds)} seconds
          </small>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    showMessage: hasTime(state),
    seconds: getSeconds(state)
  });

  return connect(mapStateToProps, {initTimer, startTimer})(MaybeShow);
};

export default limitVisibility;
