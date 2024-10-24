import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React, { FC, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useWriteContract } from "wagmi";
import { Asset } from "@/config/token";
import { LayersIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { formatUnits, parseUnits } from "viem";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import StrategyManagerABI from '@/abi/StrategyManager.abi.json';
import { strategyManagerAddress } from "@/config/contracts";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";

export interface ReStakeProps {
  asset?: Asset,
}

export const ReStakeDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<FC<ReStakeProps & DialogProps>>
>(({ asset, ...props }, ref) => {
  const form = useForm();
  const { writeContractAsync } = useWriteContract();

  const [loading, setLoading] = useState(false);

  const handleWriteContract = useCallback(async () => {
    if(!asset) return;
    setLoading(true);
    try {
      const value = form.getValues();
      const amount = value.amount;

      console.log(asset);
      console.log(amount);
      const txHash = await writeContractAsync({
        abi: StrategyManagerABI,
        address: strategyManagerAddress,
        functionName: "depositIntoStrategy",
        args: [
          asset?.strategyAddress,
          asset?.address,
          parseUnits(amount, asset?.decimals),
        ],
      });
      console.log(txHash);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [asset, form, writeContractAsync]);


  
  return (
    <Dialog
      {...props}
    >
      <DialogContent ref={ref}>
        <DialogTitle>
          <div>
            Restaking Assets
          </div>
        </DialogTitle>
        <div className="flex gap-4 items-center">
          <div className=" flex items-center gap-1">
            <img className=" rounded-md" src={asset?.logoUrl || ''}  width={40} height={40}/>
            <div>{asset?.name}</div>
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
        </div>
        <div className=" flex items-center justify-end gap-2">
          <div>
            <LayersIcon  className="h-4 w-4"/>
          </div>
          {formatUnits(asset?.balance as bigint, asset?.decimals || 1)}
        </div>

        <div>

          <div className=" flex items-center justify-between">
            <div>Token Address</div>
            <div className=" w-32 truncate">{asset?.address}</div>

          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <Button
            className=" w-full"
            disabled={loading}
            onClick={() => {
              handleWriteContract();
            }}
          >ReStake {asset?.name}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
});

ReStakeDialog.displayName = "ReStakeDialog"