import { assets} from '@/config/token'
import { useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";

import { useRetrieveQueuedAndWithdrawableWithdrawals } from '@/data/eigen';
import { Address } from 'viem';
// import { ABI as StrategyManagerABI} from '@/abi/StrategyManager';
import { ABI as StrategyBaseABI} from '@/abi/StrategyBase';

export const useWithdrawAbleAssets = () => {
  const account = useAccount();
  const {data} = useRetrieveQueuedAndWithdrawableWithdrawals({
    address: account.address
  });

  const availableTokenWithdrawals = useMemo(() => {
    const withdrawalsData: any[] = (data as any)?.data || []
    return assets.map((at) => {

      const withdrawals = withdrawalsData.filter((wd) => {
        return wd.shares.some((share: any) => share.strategyAddress.toLowerCase() ===at.strategyAddress?.toLowerCase());
      });

      const allShares = withdrawalsData.map((wd) => {
        return wd.shares.filter((share: any) => share.strategyAddress.toLowerCase() === at.strategyAddress?.toLowerCase());
      }).flat();

      const allBalance = allShares.reduce((total, item) => {
        return BigInt(item.shares) + total;
      }, BigInt(0))

      return {
        asset: at,
        amount: BigInt(allBalance),
        balance: BigInt(0),
        withdrawals: withdrawals,
      }
    }).filter((t) => t.withdrawals.length > 0);
  }, [data]);
  const strategyAsset = useMemo(() => {
    return availableTokenWithdrawals;
  }, [availableTokenWithdrawals])
  const contracts = useMemo(() => {
    const input = strategyAsset.map((asset) => {
      return {
        account: account.chainId,
        address: asset.asset.strategyAddress as Address,
        abi: StrategyBaseABI,
        functionName: "sharesToUnderlyingView",
        args: [asset.amount],
      } as const
    });
    return input;
  }, [account.chainId, strategyAsset])
  const { data: shareUnderlyingViews = [] } = useReadContracts({
    contracts,
    allowFailure: true,
  });
  return useMemo(() => {
    return availableTokenWithdrawals.map((wd, index) => {
      const balance = shareUnderlyingViews[index]?.result || BigInt(0);
      return {
        ...wd,
        balance,
      }
    })
  }, [availableTokenWithdrawals, shareUnderlyingViews]);
}