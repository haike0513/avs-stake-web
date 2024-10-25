import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useRetrieveStaker } from "@/data/eigen";
import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { StakedToken } from "../StakedInfo";
import { AssetMap } from "@/config/token";
import { Button } from "@/components/ui/button";

export const WithdrawDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => {


  const account = useAccount();

  const {data} = useRetrieveStaker({
    address: account.address
  });
  const tvlStrategies = useMemo(() => {
    return Object.entries((data as any)?.tvl?.tvlStrategies || {});
  }, [data])
  
  
  
  return(
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div>Withdraw</div>
      <div className="flex flex-col gap-4">
        <div className=" flex flex-col gap-2 my-8">
            {tvlStrategies.map((tvl) => {
              return <StakedToken 
              key={tvl[0]} 
              icon={AssetMap[tvl[0]]?.logoUrl}
              name={tvl[0]} 
              amount={`${tvl[1] || 0}`}
              />
            })}
          </div>
          <div className=" w-full">
          <Button className=" w-full">Withdraw</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
});

WithdrawDialog.displayName = "WithdrawDialog"