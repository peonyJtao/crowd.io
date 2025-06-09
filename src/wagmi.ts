import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, } from 'viem';

import {
  // optimism,
  // polygon,
  baseSepolia,
  // arbitrum,
  // base,
  mainnet,
  sepolia,
} from 'wagmi/chains';
import { ganacheChain, ganache_sepolia, infura_sepolia } from './infura';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    sepolia,
    mainnet,
    baseSepolia,
    ganacheChain
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: false,
  transports: {
    [sepolia.id]: http(infura_sepolia),
    [ganacheChain.id] : http(ganache_sepolia),
  },
});
