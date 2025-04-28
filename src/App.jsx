import { useState } from 'react';
import ConnectWallet from './components/connectWallet.jsx';
import TokenInfo from './components/tokenInfor.jsx';

function App() {
  const [account, setAccount] = useState('');

  console.log('Current account:', account);

  return (
    <div>
      <ConnectWallet setAccount={setAccount} />
      {account ? (
        <TokenInfo account={account} />
      ) : (
        <p>Please connect your wallet to view token info</p>
      )}
    </div>
  );
}

export default App;