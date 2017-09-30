import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from './logo.svg';
import './Countdown.css';
import PropTypes from 'prop-types';
import {formatTimeFromSeconds} from './utils.js';
import {tick, initTimer, startTimer} from './actions';

const countdowns = [10, 20, 300];

class Countdown extends Component {
  async componentDidMount() {
    // not really needed here but if we want to ensure promises resolve before the next
    // function is called, we can use async/await
    await countdowns.forEach((c, i) =>
      this.props.initTimer({id: `timer${i + 1}`, seconds: c})
    );

    countdowns.forEach((c, i) => {
      // here we can now dispatch a function because of the thunk middleware
      this.props.startTimer({
        id: `timer${i + 1}`,
        seconds: c,
        waitTime: i <= 1 ? c * 250 : null
      });
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

const mapStateToProps = state => ({timers: state.timers});

const mapDispatchToProps = dispatch =>
  bindActionCreators({tick, initTimer, startTimer}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
