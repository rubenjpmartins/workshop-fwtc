import {useState} from "react"
import './App.css';

import { ethers } from "ethers"
import Token from "./artifacts/contracts/Token.sol/Token.json"


const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

function App() {
  const [transferAmount, setTransferAmount] = useState(0);
  const [balance, setBalance] = useState("0");
  const [targetAddress, setTargetAddress] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchBalance() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const account = await signer.getAddress()
      const contract = new ethers.Contract(contractAddress, Token.abi, provider)
      try {
        const balance = await contract.balanceOf(account)
        setBalance(ethers.utils.commify(ethers.utils.formatUnits(balance, "wei")))
      } catch(err) {
        console.log("Error: ", err)
      }
    }
  }

  async function transfer() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Token.abi, provider)
      try {
        await contract.connect(signer).transfer(targetAddress, transferAmount)
      } catch(err) {
        console.log("Error: ", err)
      }
    }
  }

  return (
    <div className="App">
      <div style={{ marginTop: 20 }}>
        <span>BALANCE: {balance}</span>
        <button onClick={() => fetchBalance()}>FETCH</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={{ marginRight: 20 }}>AMOUNT</label>
        <input value={transferAmount} type="number" onChange={(e) => setTransferAmount(e.target.value)} />
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={{ marginRight: 20 }}>ADDRESS</label>
        <input value={targetAddress} type="text" onChange={(e) => setTargetAddress(e.target.value)} />
      </div>

      <button style={{ marginTop: 20 }} onClick={() => transfer()}>TRANSFER</button>
      <button style={{ marginTop: 20 }} onClick={() => requestAccount()}>CONNECT</button>
    </div>
  );
}

export default App;
