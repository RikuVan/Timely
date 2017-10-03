import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer';

const App = ({color}) => (
  <div className="App" style={{backgroundColor: color}}>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Timely</h1>
    </header>
    <div style={{paddingTop: '20px'}}>
      {[12, 15, 20].map((s, i) => (
        <Timer id={`timer${i}`} seconds={s} key={i} />
      ))}
    </div>
  </div>
);

export default App;
