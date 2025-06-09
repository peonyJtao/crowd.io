import {
  Chain
} from '@rainbow-me/rainbowkit';
const infura_id = "e13a0357a9db4d00a059cad2ec4d8787"
// sepolia 私有网络
export const infura_sepolia = `https://sepolia.infura.io/v3/${infura_id}`;

export const infura_hoodi = `https://hoodi.infura.io/v3/${infura_id}`;

export const infura_mainnet = `https://mainnet.infura.io/v3/${infura_id}`;

export const infura_polygon = `https://polygon-amoy.infura.io/v3/${infura_id}`;

export const infura_base = `https://base-mainnet.infura.io/v3/${infura_id}`;

export const ganache_sepolia = `http://127.0.0.1:7545`;
// 1. 定义本地 Ganache 链
export const ganacheChain = {
  id: 1337,
  name: 'Ganache',
  // network: 'ganache',
  iconUrl: 'https://example.com/icon.svg', // 可选
  iconBackground: '#000',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:7545'],
    },
    public: {
      http: ['http://127.0.0.1:7545'],
    },
  },
} as const satisfies Chain;;