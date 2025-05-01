import { useAccount } from 'wagmi'
import { useState } from 'react'
import Header from './components/Header'
import TokenSelector from './components/TokenSelector'
import TransferForm from './components/TransferForm'
import TxStatus from './components/TxStatus'

const TOKEN_LIST = [
  {
    name: 'MyToken',
    symbol: 'MTK',
    address: import.meta.env.VITE_CONTRACT_SEPOLIA_ADDRESS,
    decimals: 18,
  },
  // {
  //   name: 'NewToken',
  //   symbol: 'NTK',
  //   address: import.meta.env.VITE_CONTRACT_SEPOLIA_ADDRESS,
  //   decimals: 18,
  // },
]

function App() {
  const { address, isConnected } = useAccount()
  const [token, setToken] = useState(TOKEN_LIST[0])
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [txHash, setTxHash] = useState(null)

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Header />
      {isConnected && (
        <div className="mt-4 space-y-4">
          <p><b>Ví:</b> {address}</p>

          <TokenSelector token={token} setToken={setToken} tokens={TOKEN_LIST} />
          <TransferForm
            token={token}
            receiver={receiver}
            setReceiver={setReceiver}
            amount={amount}
            setAmount={setAmount}
            setTxHash={setTxHash}
          />
          <TxStatus txHash={txHash} />
        </div>
      )}
    </div>
  )
}

export default App
