import {useState} from "react"
import logo from './logo.svg';
import './App.css';

import { ethers } from "ethers"
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setGreeting] = useState()

  async function requestAccount() {
    
  }

  async function fetchGreeting() {

  }

  async function setGreeting() {

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
