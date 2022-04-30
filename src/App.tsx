import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import NFT from './components/NFT';

function App() {

  return (
    <div className="App">
      {/* <ul className='list'>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
      <Header /> */}
      <NFT />
    </div>
  );
}

export default App;
