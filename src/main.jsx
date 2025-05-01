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

// Define the chains and providers
const chains = [sepolia]

// Get custom RPC URL from environment variable or use a default
const sepoliaRpcUrl = import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'

// Configure RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'My Dapp',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains,
})

// Configure wagmi with connectors included
const config = createConfig({
  chains,
  transports: {
    [sepolia.id]: http(sepoliaRpcUrl)
  },
  connectors
})

// Create a query client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)