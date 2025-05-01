import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import erc20ABI from '../abis/ERC20.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; 

export default function TokenInfo({ account }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState(null);

  const fetchTokenInfo = async () => {
    if (!account || !window.ethereum) {
      setError('Please connect your wallet');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Kiểm tra mạng
      const network = await provider.getNetwork();
      console.log('Current network:', network.name);
      setNetwork(network);

      // Kiểm tra sự tồn tại của hợp đồng
      const code = await provider.getCode(contractAddress);
      if (code === '0x') {
        setError('No contract found at the specified address');
        return;
      }

      // Kiểm tra erc20ABI
      if (!Array.isArray(erc20ABI)) {
        setError('Invalid ABI: ABI is not an array');
        return;
      }

      const contract = new ethers.Contract(contractAddress, erc20ABI, provider);

      // Gọi các phương thức của hợp đồng
      const tokenName = await contract.name();
      const tokenSymbol = await contract.symbol();
      const rawBalance = await contract.balanceOf(account);
      const rawTotalSupply = await contract.totalSupply();

      setName(tokenName);
      setSymbol(tokenSymbol);
      setBalance(ethers.formatUnits(rawBalance, 18));
      setTotalSupply(ethers.formatUnits(rawTotalSupply, 18));
    } catch (err) {
      setError(`Error fetching token info: ${err.message}`);
      console.error('Error fetching token info:', err);
    }
  };


  useEffect(() => {
    fetchTokenInfo();
  }, [account]);

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <h3>Token Name: {name}</h3>
          <h3>Token Symbol: {symbol}</h3>
          <h3>Your Balance: {balance}</h3>
          <h3>Total Supply: {totalSupply}</h3>
          <h3>Network: {network?.name}</h3>
          <h3>Chain id: {network?.chainId}</h3>
        </>
      )}
    </div>
  );
}