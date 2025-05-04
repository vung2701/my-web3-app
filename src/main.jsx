import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createConfig, WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Define localhost (Hardhat) chain
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
};

// Supported chains (include both Sepolia and localhost)
const chains = [sepolia, localhost];

// Get RPC URL and network from environment variables
const sepoliaRpcUrl = import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://rpc2.sepolia.org';
const network = import.meta.env.VITE_NETWORK || 'sepolia'; // Default to Sepolia for production

// Configure RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'My Dapp',
  projectId: import.meta.env.VITE_PROJECT_ID ,
  chains,
});

// Configure Wagmi
const config = createConfig({
  chains,
  transports: {
    [sepolia.id]: http(sepoliaRpcUrl),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
  connectors,
});

// Tạo QueryClient
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider
          chains={chains}
          initialChain={network === 'sepolia' ? sepolia : localhost}
        >
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);