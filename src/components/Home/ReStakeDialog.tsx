import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React, { FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Asset } from "@/config/token";
import { LayersIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Address, erc20Abi, formatUnits, parseUnits } from "viem";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";
// import StrategyManagerABI from '@/abi/StrategyManager.abi.json';
import { ABI as StrategyManagerABI} from '@/abi/StrategyManager';
import { ABI as DelegationManagerABI} from '@/abi/DelegationManager';

import { strategyManagerAddress } from "@/config/contracts";
import { useForm, useWatch } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import BigNumber from "bignumber.js";

export interface ReStakeProps {
  asset?: Asset,
  operator?: string,
}

export const ReStakeDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<FC<ReStakeProps & DialogProps>>
>(({ asset, operator, ...props }, ref) => {
  const form = useForm();
  const value = useWatch({
    control: form.control,
  })
  const { writeContractAsync } = useWriteContract();

  const [loading, setLoading] = useState(false);
  const {address} = useAccount();

  const {data: allowance} = useReadContract({
    abi: erc20Abi,
    address: asset?.address as Address,
    functionName: "allowance",
    args: [
      address as Address,
      strategyManagerAddress,
    ],
  });

  const shouldApprove = useMemo(() => {
    const amount = value?.amount || "0";
    const unit = parseUnits(amount, asset?.decimals || 1);
    return new BigNumber(unit.toString()).gte(new BigNumber((allowance || 0).toString()))
  }, [allowance, asset?.decimals, value?.amount]);


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
          asset?.strategyAddress as Address,
          asset?.address as Address,
          parseUnits(amount, asset?.decimals),
        ],
      });
      console.log(txHash);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [asset, form, writeContractAsync]);



  const handleDelegateToOperator = useCallback(async () => {
    if(!asset) return;
    setLoading(true);
    try {
      const value = form.getValues();
      const amount = value.amount;

      console.log(asset);
      console.log(amount);
      const txHash = await writeContractAsync({
        abi: DelegationManagerABI,
        address: strategyManagerAddress,
        functionName: "delegateTo",
        args: [
          operator as Address,
          {
            signature: "0x",
            expiry: BigInt(0),
          },
          "0x",
        ],
      });
      console.log(txHash);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [asset, form, operator, writeContractAsync]);



  const handleApprove = useCallback(async () => {
    if(!asset) return;
    setLoading(true);
    try {
      const value = form.getValues();
      const amount = value.amount;

      console.log(asset);
      console.log(amount);
      const txHash = await writeContractAsync({
        abi: erc20Abi,
        address: asset.address as Address,
        functionName: "approve",
        args: [
          strategyManagerAddress,
          parseUnits("1000000000000000", 18),
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
          {shouldApprove ?<Button
            className=" w-full"
            disabled={loading}
            onClick={() => {
              handleApprove();
            }}
          >Approve {asset?.name}</Button> : <Button
          className=" w-full"
          disabled={loading}
          onClick={() => {
            if(true) {
              handleWriteContract();
            } else {
              handleDelegateToOperator();
            }

          }}
        >ReStake {asset?.name}</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
});

ReStakeDialog.displayName = "ReStakeDialog"