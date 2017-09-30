import React, {Component} from 'react';
import logo from './logo.svg';
import './Countdown.css';
import PropTypes from 'prop-types';
import {delay, formatTimeFromSeconds} from './utils.js';
import {store} from './index.js';

const countdowns = [10, 20, 300];

class Countdown extends Component {
  tasks = [];

  setCountdown = i => {
    const int = window.setInterval(
      () => store.dispatch({type: 'TICK', payload: {id: `timer${i + 1}`}}),
      1000
    );
    this.tasks.push(int);
  };

  componentDidMount() {
    countdowns.forEach((c, i) =>
      store.dispatch({type: 'INIT', payload: {id: `timer${i + 1}`, seconds: c}})
    );
    countdowns.forEach((c, i) => {
      delay(c * 250, () => this.setCountdown(i));
    });
  }

  componentWillReceiveProps(nextProps) {
    const {timers} = this.props;
    const timerIds = Object.keys(timers);
    timerIds.forEach((key, i) => {
      if (timers[key] && timers[key].seconds === 0) {
        window.clearInterval(this.tasks[i]);
      }
    });
  }

  render() {
    const timers = this.props.timers;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Timely</h1>
        </header>
        {Object.keys(timers).map((id, i) => (
          <h1 className="Timer" key={i}>
            {`Countdown #${i + 1}`}:{' '}
            {timers[id].seconds === 0 ? (
              'BOOM!'
            ) : (
              formatTimeFromSeconds(timers[id].seconds)
            )}
          </h1>
        ))}
      </div>
    );
  }
}

Countdown.propTypes = {
  timers: PropTypes.object.isRequired
};

export default Countdown;
