import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import NFT from './components/NFT';

function App() {

  return (
    <div className="App">
      <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...">
        Save Changes
      </button>
      <NFT />
    </div>
  );
}

export default App;
