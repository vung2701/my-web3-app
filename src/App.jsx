import { useState } from 'react';
import ConnectWallet from './components/connectWallet.jsx';
import TokenInfo from './components/tokenInfor.jsx';
import SendETH from './components/sendETH.jsx';
import SendToken from './components/sendToken.jsx';

function App() {
  const [account, setAccount] = useState('');


  return (
    <div>
      <ConnectWallet account={account} setAccount={setAccount} />
      {account && <>
        <TokenInfo account={account} />
        <SendETH />
        <SendToken />
      </>
      }
    </div>
  );
}

export default App;