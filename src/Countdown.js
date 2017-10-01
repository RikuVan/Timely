import React, {Component} from 'react';
import logo from './logo.svg';
import './Countdown.css';
import PropTypes from 'prop-types';
//import {delay, formatTimeFromSeconds} from './utils.js';
//import {store} from './index.js';

//const countdowns = [10, 20, 300];

class Countdown extends Component {
  componentDidMount() {
    //initialize your timers in the store and then start off the countdowns
  }

  componentWillReceiveProps(nextProps) {
    // get your timer object an interate over the keys to see if any have ticked down to zero
    // const timerIds = Object.keys(this.props.timers);
    // of any are at zero, clear the interval so they don't go under zero
  }

  render() {
    //const timers = this.props.timers;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Timely</h1>
        </header>
        {/*you can map the keys of your timers object use the keys to get each timer, e.g. this.props.timers[key] */}
        <h1>Your timers here</h1>
      </div>
    );
  }
}

Countdown.propTypes = {
  timers: PropTypes.object.isRequired
};

export default Countdown;
