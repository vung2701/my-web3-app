// SendETHComponent.jsx
import React, { useState } from "react";
import { ethers } from "ethers";

export default function SendETH() {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [status, setStatus] = useState("");

  const sendETH = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount),
      });

      setTxHash(tx.hash);
      setStatus("⏳ Waiting for confirmation...");

      const receipt = await tx.wait();
      setStatus(`✅ Confirmed in block ${receipt.blockNumber}`);
    } catch (err) {
      setStatus("❌ " + err.message);
    }
  };

  return (
    <div>
      <h3>Gửi ETH</h3>
      <input
        placeholder="To address"
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        placeholder="Amount (ETH)"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendETH}>Gửi ETH</button>

      {status && <p>{status}</p>}
      {txHash && (
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Xem trên Etherscan
        </a>
      )}
    </div>
  );
}
