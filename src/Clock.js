import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './Clock.css';

class Clock extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Timely</h1>
        </header>
        <div className="Clock">
          <p>00:00:00:00</p>
        </div>
      </div>
    );
  }
}

export default Clock;
