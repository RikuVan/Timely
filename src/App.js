import React from 'react';
import logo from './logo.svg';
import './App.css';
import SecretMessage from './SecretMessage';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Timely</h1>
    </header>
    <SecretMessage message="ticket #67832 is assigned to you" />
  </div>
);

export default App;
