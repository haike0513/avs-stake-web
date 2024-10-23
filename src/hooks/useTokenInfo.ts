import { useReadContracts } from "wagmi";
import { Asset} from '@/config/token'
import { useMemo } from "react";
import { Address, erc20Abi } from "viem";

export const useTokensInfo = (assets: Asset[], account: string, chainId: number) => {
  const contracts = useMemo(() => {
    const input = assets.map((asset) => {
      return {
        chainId,
        address: asset.address as Address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account as Address],
      } as const
    });
    return input;
  }, [account, assets, chainId])
  const { data = [], isError, isLoading, refetch } = useReadContracts({
    contracts,
    allowFailure: true,
  });
  const tokenBalances = useMemo(() => {
    return data.map((b, i) => {
      const asset = assets[i];
      const balance = b.result ?? 0;
      return {
        ...asset,
        balance,
      }
    })
  }, [assets, data]);

  return useMemo(() => ({
    isLoading,
    isError,
    balances: tokenBalances,
    refetch,
  }), [isError, isLoading, refetch, tokenBalances])
}