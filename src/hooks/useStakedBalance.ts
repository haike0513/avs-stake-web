import { assets} from '@/config/token'
import { useMemo } from "react";
import { Address } from "viem";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { ABI as StrategyManagerABI} from '@/abi/StrategyManager';
import { ABI as StrategyBaseABI} from '@/abi/StrategyBase';

import { strategyManagerAddress } from "@/config/contracts";

export const useStakedShare = () => {
  const account = useAccount();
  const {data: deposits } = useReadContract({
    abi: StrategyManagerABI,
    address: strategyManagerAddress,
    functionName: "getDeposits",
    args: [
      account.address as Address,
    ],
  });

  const stakedBalance = useMemo(() => {
    const [tokens = [], balances = []] = deposits || [[], []];
    return tokens.map((address, index) => {
      const token = assets.find((t) => {
        return t.strategyAddress?.toLowerCase() == address.toLowerCase();
      }) 
     return {
      token: token,
      balance: balances[index]
     } 
    })
  }, [deposits])

  return stakedBalance;
}


export const useStakedBalance = () => {
  const account = useAccount();
  // const {data: deposits } = useReadContract({
  //   abi: StrategyManagerABI,
  //   address: strategyManagerAddress,
  //   functionName: "getDeposits",
  //   args: [
  //     account.address as Address,
  //   ],
  // });

  const chainId = account.chainId;


  const strategyAsset = useMemo(() => {
    return assets;
  }, [])


  const contracts = useMemo(() => {
    const input = strategyAsset.map((asset) => {
      return {
        chainId,
        address: asset.strategyAddress as Address,
        abi: StrategyBaseABI,
        functionName: "userUnderlyingView",
        args: [account.address as Address],
      } as const
    });
    return input;
  }, [account.address, chainId, strategyAsset])
  const { data: underlyingViews = [] } = useReadContracts({
    contracts,
    allowFailure: true,
  });

  const stakedBalance = useMemo(() => {
    const balances = underlyingViews || [];
    return strategyAsset.map((asset, index) => {
     return {
      token: asset,
      balance: balances[index]?.result || BigInt(0)
     } 
    }).filter((s) => s.balance > BigInt(0));
  }, [strategyAsset, underlyingViews])

  return stakedBalance;
}