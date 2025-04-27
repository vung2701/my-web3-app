import { useEffect, useState } from "react";
import { ethers } from "ethers";
import erc20ABI from "./abi/MyToken.json"; 

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; // Địa chỉ hợp đồng ERC20

export default function TokenInfo({ account }) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (account && window.ethereum) {
        const provider = new ethers.Web3Provider(window.ethereum); // Sử dụng Web3Provider
        const contract = new ethers.Contract(
          contractAddress,
          erc20ABI,
          provider
        );

        // Lấy thông tin token
        const tokenName = await contract.name();
        const tokenSymbol = await contract.symbol();
        const rawBalance = await contract.balanceOf(account);

        // Cập nhật thông tin vào state
        setName(tokenName);
        setSymbol(tokenSymbol);
        setBalance(ethers.formatUnits(rawBalance, 18)); // Token thường có 18 decimals
      }
    };

    fetchTokenInfo();
  }, [account]);

  return (
    <div>
      <h3>Token Name: {name}</h3>
      <h3>Token Symbol: {symbol}</h3>
      <h3>Your Balance: {balance}</h3>
    </div>
  );
}
