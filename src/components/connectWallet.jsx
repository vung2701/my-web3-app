import { useState } from "react";

export default function ConnectWallet() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };
  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
}
