import { assets} from '@/config/token'
import { useMemo } from "react";
import { useAccount } from "wagmi";

import { useRetrieveQueuedAndWithdrawableWithdrawals } from '@/data/eigen';


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
      })

      return {
        asset: at,
        amount: BigInt(0),
        withdrawals: withdrawals,
      }
    }).filter((t) => t.withdrawals.length > 0);
  }, [data]);
  return availableTokenWithdrawals;
}