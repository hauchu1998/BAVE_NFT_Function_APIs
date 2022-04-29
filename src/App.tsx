import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import NFT from './components/NFT';

axios.get('/api/api/get_token')
.then((res) => console.log(res))
.catch((err) => console.log(err))

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
