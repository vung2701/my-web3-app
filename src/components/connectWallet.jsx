import { useState } from 'react';
import { ethers } from 'ethers';

export default function ConnectWallet({ setAccount }) {
  const [error, setError] = useState(null);

  const connect = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setError(null);
      } else {
        setError('No accounts found');
      }
    } catch (err) {
      setError(`Failed to connect wallet: ${err.message}`);
      console.error('Connect wallet error:', err);
    }
  };

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}