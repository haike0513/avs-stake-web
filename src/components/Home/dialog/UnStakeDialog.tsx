import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React, { useCallback, useMemo, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { StakedToken } from "../StakedInfo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ABI as DelegationManagerABI} from '@/abi/DelegationManager';
import { delegationManagerAddress } from "@/config/contracts";
import { useStakedBalance } from "@/hooks/useStakedBalance";
import { Address, formatUnits, parseUnits } from "viem";

export const UnStakeDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => {

  const form = useForm();


  const { writeContractAsync } = useWriteContract();
  const [, setLoading] = useState(false);


  const [checkedToken, setCheckedToken] = useState<string>();


  const stakedBalance = useStakedBalance();

  const checkedStaked = useMemo(() => {
    return stakedBalance.find((st) => st.token?.address === checkedToken);
  }, [checkedToken, stakedBalance]);

  const {address} = useAccount();

  const handleUnStake = useCallback(async () => {
    setLoading(true);
    try {
      const value = form.getValues();
      const amount = value.amount;
      if(!checkedStaked || !amount || !address) return;
      const share = parseUnits(amount, checkedStaked?.token?.decimals || 0);
      const strategyAddress = [checkedStaked.token?.strategyAddress as Address];
      const shares = [share];
      await writeContractAsync({
        abi: DelegationManagerABI,
        address: delegationManagerAddress,
        functionName: "queueWithdrawals",
        args: [
          [
            {
              strategies: strategyAddress,
              shares,
              withdrawer: address,
            }
          ]
        ],
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [address, checkedStaked, form, writeContractAsync]);
  
  return(
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div className=" font-bold text-xl">Available to Unstake</div>
      <div className="flex flex-col gap-4">

      <div className=" flex flex-col gap-2 my-8">
        {stakedBalance.map((st) => {
            return <div className=" flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-sm" key={st.token?.address} 
              onClick={() => {
                setCheckedToken(st.token?.address)
              }}
            >
              <Checkbox  checked={checkedToken === st.token?.address }/>
              <div className=" flex-grow">

                <StakedToken 
                key={st.token?.address} 
                icon={st.token?.logoUrl}
                name={st.token?.name} 
                amount={`${formatUnits(st.balance, st.token?.decimals || 0)}`}
                />
              </div>
            </div>
          })}
        </div>
        <div className=" w-full">
          <div>
            Unstake {checkedStaked?.token?.name}
          </div>
          <div className="my-6 flex items-center gap-6">
            <div className="flex items-center justify-center gap-2 w-20">
              {checkedStaked?.token?.logoUrl && <img className="w-6 h-6 rounded-md" src={checkedStaked?.token?.logoUrl}/>}
              <div>{checkedStaked?.token?.name}</div>
            </div>
            <div className=" flex-grow">
              <Form {...form}>
                <FormField 
                  control={form.control}
                  name="amount"
                  render={({field}) => {
                    return<Input type="number" {...field}/>
                  }}
                />
              </Form>
            </div>
            {/* <div className=" w-20"></div> */}
          </div>
          <Button className=" w-full"
            onClick={() => {
              handleUnStake();
            }}
          >UnStake</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
});

UnStakeDialog.displayName = "UnStakeDialog"