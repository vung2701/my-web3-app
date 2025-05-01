import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createConfig, WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { http } from 'viem'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Định nghĩa mạng localhost (Hardhat)
const localhost = {
  id: 31337,
  name: 'Hardhat',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
}

// Danh sách các chuỗi được hỗ trợ
const chains = [sepolia, localhost]

// Lấy RPC URL và mạng từ biến môi trường
const sepoliaRpcUrl = import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'
const network = import.meta.env.VITE_NETWORK || 'localhost' // 'sepolia' hoặc 'localhost'

// Cấu hình RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'My Dapp',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains,
})

// Cấu hình Wagmi
const config = createConfig({
  chains,
  transports: {
    [sepolia.id]: http(sepoliaRpcUrl),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
  connectors,
})

// Tạo QueryClient
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider chains={chains} initialChain={network === 'sepolia' ? sepolia : localhost}>
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)