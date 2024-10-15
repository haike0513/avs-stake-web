// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon } from 'viem/chains';
import { createConfig } from 'wagmi';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  // walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet],
    },
  ],
  {
    appName: 'AVS Stake',
    projectId: 'avs-stake',
  },
) as any;


export const config = createConfig({
  connectors,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
} as any);