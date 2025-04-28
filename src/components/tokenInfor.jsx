import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import erc20ABI from '../abis/ERC20.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Đảm bảo đúng địa chỉ

export default function TokenInfo({ account }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!account || !window.ethereum) {
        setError('Please connect your wallet');
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Kiểm tra mạng
        const network = await provider.getNetwork();
        console.log('Network details:', network);
        const chainId = network.chainId;
        console.log('Current chainId:', chainId.toString());

        // Kiểm tra sự tồn tại của hợp đồng
        const code = await provider.getCode(contractAddress);
        console.log('Contract bytecode:', code);
        if (code === '0x') {
          setError('No contract found at the specified address');
          return;
        }

        // Kiểm tra erc20ABI
        console.log('erc20ABI type:', typeof erc20ABI, 'isArray:', Array.isArray(erc20ABI));
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

        console.log('Total Supply:', rawTotalSupply.toString());

        setName(tokenName);
        setSymbol(tokenSymbol);
        setBalance(ethers.formatUnits(rawBalance, 18));
        setTotalSupply(ethers.formatUnits(rawTotalSupply, 18));
      } catch (err) {
        setError(`Error fetching token info: ${err.message}`);
        console.error('Error fetching token info:', err);
      }
    };

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
        </>
      )}
    </div>
  );
}