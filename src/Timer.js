import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initTimer, startTimer, pause} from './actions';
import {formatTimeFromSeconds} from './utils.js';
import './Timer.css';
import R from 'ramda';

const getSeconds = id => R.pathOr(0, ['timers', id, 'seconds']);
const getCanceller = id => R.pathOr(0, ['timers', id, 'cancel']);
const getIsActive = id => R.pathOr(false, ['timers', id, 'active']);

class Timer extends Component {
  componentDidMount() {
    this.init();
  }

  init = () =>
    this.props.initTimer({
      id: this.props.id,
      seconds: this.props.seconds
    });

  start = seconds => {
    this.props.startTimer({
      id: this.props.id,
      seconds
    });
  };

  cancel = () => {
    this.props.cancel();
    this.props.pause({id: this.props.id});
  };

  render() {
    return (
      <div className="Timer">
        <p>
          Remaining time:{' '}
          <strong>{formatTimeFromSeconds(this.props.remainingSeconds)}</strong>
        </p>
        <button
          onClick={() => this.start(this.props.remainingSeconds)}
          disabled={this.props.remainingSeconds === 0 || this.props.active}
        >
          Start
        </button>
        <button
          onClick={this.cancel}
          disabled={!this.props.cancel || !this.props.active}
        >
          Stop
        </button>
        <button
          onClick={this.init}
          disabled={
            (this.props.remainingSeconds === this.props.seconds ||
            this.props.active) &&
            this.props.remainingSeconds !== 0
          }
        >
          Reset
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  remainingSeconds: getSeconds(ownProps.id)(state),
  cancel: getCanceller(ownProps.id)(state),
  active: getIsActive(ownProps.id)(state)
});

export default connect(mapStateToProps, {initTimer, startTimer, pause})(Timer);
