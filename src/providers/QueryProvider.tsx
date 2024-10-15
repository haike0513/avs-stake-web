'use client'
import { WagmiProvider } from 'wagmi';

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '@/config';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function QueryProviders(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <RainbowKitProvider>
            {props.children}
          </RainbowKitProvider>
        </ReactQueryStreamedHydration>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}