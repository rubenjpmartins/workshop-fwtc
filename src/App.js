import {useState} from "react"
import './App.css';

import { ethers } from "ethers"
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setGreeting] = useState("")

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log(data)
      } catch(err) {
        console.log("Error: ", err)
      }
    }
  }

  async function changeGreeting() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Greeter.abi, signer)
      const tx = await contract.setGreeting(greeting)
      await tx.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={greeting} placeholder="input something" onChange={(e) => setGreeting(e.target.value)}/>
        <button style={{ marginTop: 20 }} onClick={() => changeGreeting()}>CHANGE</button>
        <button style={{ marginTop: 20 }} onClick={() => fetchGreeting()}>FETCH</button>
        <button style={{ marginTop: 20 }} onClick={() => requestAccount()}>CONNECT</button>
      </header>
    </div>
  );
}

export default App;
