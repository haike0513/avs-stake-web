import { assets} from '@/config/token'
import { useMemo } from "react";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ABI as StrategyManagerABI} from '@/abi/StrategyManager';
import { strategyManagerAddress } from "@/config/contracts";

export const useStakedBalance = () => {
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