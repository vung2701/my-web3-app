import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import TokenSelector from './components/TokenSelector';
import TransferForm from './components/TransferForm';
import TxStatus from './components/TxStatus.jsx';
import { CONTRACT_ADDRESSES } from './constants/contractAddresses.js';
import './App.css';
import ERC20_ABI from './abis/ERC20_ABI.json';
import { ethers, formatUnits } from 'ethers';

const TOKEN_LIST = [
  {
    name: 'MyToken',
    symbol: 'MTK',
    address: CONTRACT_ADDRESSES.MyToken,
    decimals: 18,
  },
  {
    name: 'NewToken',
    symbol: 'NTK',
    address: CONTRACT_ADDRESSES.NewToken,
    decimals: 18,
  },
];

function App() {
  const { address, isConnected } = useAccount();
  const [token, setToken] = useState(TOKEN_LIST[0]);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [signer, setSigner] = useState(null);

  const initData = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      console.log('Token Address:', token.address);
      const tokenContract = new ethers.Contract(token.address, ERC20_ABI, signer);
      setTokenContract(tokenContract);

      if (!address || !ethers.isAddress(address)) {
        console.error('Invalid or undefined address');
        return;
      }

      const balanceOf = await tokenContract.balanceOf(address);
      const formattedBalance = formatUnits(balanceOf, token.decimals);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error in initData:', error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      initData();
    }
  }, [isConnected, address, token]);

  return (
    <div className="wrapperPage">
      <div className="contentPage">
        <Header />
        {isConnected ? (
          <div className="bodyPage">
            <div className="walletInfor">
              <h3>Ví của bạn:</h3> <span>{address}</span>
            </div>
            <TokenSelector
              token={token}
              setToken={setToken}
              tokens={TOKEN_LIST}
              balance={balance}
              tokenContract={tokenContract}
              signer={signer}
            />
            <TransferForm
              token={token}
              receiver={receiver}
              setReceiver={setReceiver}
              amount={amount}
              setAmount={setAmount}
              setTxHash={setTxHash}
              tokenContract={tokenContract}
            />
            <TxStatus txHash={txHash} />
          </div>
        ) : (
          <ul className="descriptionApp">
            <div className="description">
              <p>
                Web này được xây dựng để hiểu rõ hơn về cách hoạt động của 1 app web trên nền tảng blockchain,
                <br /> không tập trung nhiều vào giao diện.
              </p>
              <p>
                <b>Languages:</b> BE: Solidity(smart contract-ERC20), FE: ReactJS, ethers.js
              </p>
              <p>
                <b>Deployment:</b> BE: Sepolia, FE: Vercel
              </p>
            </div>
            <li>
              <b>Chức năng chính:</b>
            </li>
            <li>1. Kết nối ví Metamask</li>
            <li>2. Chọn token muốn gửi</li>
            <li>3. Xem số dư và các thông tin của ví</li>
            <li>4. Nhận token được cấp bởi smart contract</li>
            <li>5. Gửi token đến địa chỉ khác</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;