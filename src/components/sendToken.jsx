// SendTokenComponent.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ERC20_ABI from '../abis/ERC20.json'; 

export default function SendToken() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [status, setStatus] = useState('');

  const sendToken = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(amount, decimals);

      const tx = await contract.transfer(toAddress, parsedAmount);

      setTxHash(tx.hash);
      setStatus('⏳ Waiting for confirmation...');

      const receipt = await tx.wait();
      setStatus(`✅ Confirmed in block ${receipt.blockNumber}`);
    } catch (err) {
      setStatus('❌ ' + err.message);
    }
  };

  return (
    <div>
      <h3>Gửi Token</h3>
      <input placeholder="Token contract address" onChange={e => setTokenAddress(e.target.value)} />
      <input placeholder="To address" onChange={e => setToAddress(e.target.value)} />
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />
      <button onClick={sendToken}>Gửi Token</button>

      {status && <p>{status}</p>}
      {txHash && (
        <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
          Xem trên Etherscan
        </a>
      )}
    </div>
  );
}
