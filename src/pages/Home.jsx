import { useState } from 'react';
import ConnectWallet from './components/connectWallet.jsx';
import TokenInfo from './components/tokenInfor.jsx';

function App() {
  const [account, setAccount] = useState('');


  return (
	<div>
	  <ConnectWallet account={account} setAccount={setAccount} />
	  {account ? (
		<TokenInfo account={account} />
	  ) : (
		<p>Please connect your wallet to view token info</p>
	  )}
	</div>
  );
}

export default App;