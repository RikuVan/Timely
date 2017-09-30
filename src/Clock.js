import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {formatTime} from './utils';

class Clock extends Component {
  state = {time: new Date()};

  componentDidMount() {
    this.task = window.setInterval(() => this.tick(), 20);
  }

  componentWillUnmount() {
    window.clearInterval(this.task);
  }

  tick = () => this.setState(state => ({time: new Date()}));

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Timely</h1>
        </header>
        <p className="Clock" style={{color: this.props.color}}>
          The time is: {formatTime(this.state.time)}
        </p>
      </div>
    );
  }
}

export default Clock;
