import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React, { FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { Asset } from "@/config/token";
import { ArrowRightIcon, LayersIcon, ReloadIcon } from "@radix-ui/react-icons";
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
import { SelectOperatorDialog } from "./SelectOperatorDialog";
import { useToast } from "@/hooks/use-toast";
import { waitForTransactionReceipt } from "viem/actions";

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

  const client = usePublicClient();

  const { toast } = useToast();

  const {data: allowance, refetch: allowanceRefetch} = useReadContract({
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
    let instance;
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
      instance = toast({
        duration: 100000,
        title: "Depositing",
        description: (<div className=" flex items-center">
          <ReloadIcon className="h-6 w-6 animate-spin mx-4" />
          <div>Depositing</div>
        </div>)
      })
      const result = await waitForTransactionReceipt(client!, {
        hash: txHash,
      });
      if(result.status === "success") {
        props?.onOpenChange?.(false);
      }
      console.log(txHash);
    } catch (error) {
      console.log(error);
    }
    instance?.dismiss();
    setLoading(false);
  }, [asset, client, form, props, toast, writeContractAsync]);



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
    let instance;
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
      instance = toast({
        duration: 100000,
        title: "Approving",
        description: (<div className=" flex items-center">
          <ReloadIcon className="h-6 w-6 animate-spin mx-4" />
          <div>Approving</div>
        </div>)
      })
      const result = await waitForTransactionReceipt(client!, {
        hash: txHash,
      });
      if(result.status === "success") {
        allowanceRefetch();
      }
      console.log(txHash);
    } catch (error) {
      console.log(error);
    }
    instance?.dismiss();
    setLoading(false);
  }, [allowanceRefetch, asset, client, form, toast, writeContractAsync]);

  const [operatorDialog, setOperatorDialog] = useState(false);

  const [selectOperator, setSelectOperator] = useState<string>();

  const finalOperator = useMemo(() => {
    return operator || selectOperator;
  }, [operator, selectOperator])

  
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

        <div className=" flex flex-col gap-4">
          <div className=" flex items-center justify-between">
            <div>Token Address</div>
            <div className=" w-32 truncate">{asset?.address}</div>

          </div>
          <div className=" flex items-center justify-between">
            <div>Delegated to</div>
            <div>{finalOperator ? <div className=" w-32 truncate">{finalOperator}</div>: <div className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setOperatorDialog(true);
            }}
            >Select Operator <div><ArrowRightIcon className="h-4 w-4" /></div></div>}</div>
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
      <SelectOperatorDialog
        open={operatorDialog}
        onOpenChange={(open) => {
            setOperatorDialog(open);
        }}
        onSelect={(operator?: string) => {
          setSelectOperator(operator);
        }}
       />
    </Dialog>
  )
});

ReStakeDialog.displayName = "ReStakeDialog"