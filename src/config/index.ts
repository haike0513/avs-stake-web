// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, holesky } from 'viem/chains';
// import { createConfig } from 'wagmi';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  // walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Recommended',
//       wallets: [rainbowWallet],
//     },
//   ],
//   {
//     appName: 'AVS Stake',
//     projectId: 'avs-stake',
//   },
// ) as any;


// export const config = createConfig({
//   connectors,
//   chains: [mainnet, holesky],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// } as any);


export const config = getDefaultConfig({
  appName: 'AVS Stake',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, holesky],
  wallets: [{
    groupName: 'Recommended',
    wallets: [rainbowWallet],
  }], /* optional custom wallet list */
  ssr: true,
})