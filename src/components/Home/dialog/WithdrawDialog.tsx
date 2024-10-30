import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React, { useCallback, useMemo, useState } from "react";
import { usePublicClient, useWriteContract } from "wagmi";
import { StakedToken } from "../StakedInfo";
import { assets } from "@/config/token";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ABI as DelegationManagerABI} from '@/abi/DelegationManager';
import { delegationManagerAddress } from "@/config/contracts";
import { useWithdrawAbleAssets } from "@/hooks/useWithdrawableAssets";
import { Address, formatUnits } from "viem";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toastContract } from "@/toast/contract";
// import { Address } from "viem";

export const WithdrawDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => {


  const form = useForm({
    defaultValues: {
      items: [] as string[],
    }
  });

  const watchValue = useWatch({
    control: form.control,
  });
  const client = usePublicClient();

  const { writeContractAsync } = useWriteContract();
  const [ loading, setLoading] = useState(false);

  const availableTokenWithdrawals = useWithdrawAbleAssets();

  const params = useMemo(() => {
    return availableTokenWithdrawals.filter((ft) => {
      const watchItems: string[] = watchValue.items || [];
      return watchItems.some(wt => ft.asset.address.toLowerCase() === wt.toLowerCase())
    }).map((item) => item.withdrawals).flat();
  }, [availableTokenWithdrawals, watchValue.items])

  const handleWithdraw = useCallback(async () => {
    setLoading(true);
    try {
      const contractParams = params;
      const args = contractParams.map((p)=> {
        const tokens: string[] = (p.shares.map((item: any) => item.strategyAddress) as string[])
        .map((s) => assets.find((a) => a.strategyAddress?.toLowerCase() === s.toLowerCase())!.address);
        return {
          withdrawal:{
            staker: p.stakerAddress,
            delegatedTo:p.delegatedTo,
            withdrawer: p.withdrawerAddress,
            nonce:p.nonce ,
            startBlock: p.createdAtBlock,
            strategies: p.shares.map((item: any) => item.strategyAddress),
            shares:p.shares.map((item: any) => item.shares),
          },
          tokens:tokens as Address[],
          middlewareTimesIndex: BigInt(0),
          receiveAsTokens: false,
        }
      })

      const contractPost = writeContractAsync({
        abi: DelegationManagerABI,
        address: delegationManagerAddress,
        functionName: "completeQueuedWithdrawals",
        args: [
          args.map((item) => item.withdrawal),
          args.map((item) => item.tokens),
          args.map((item) => item.middlewareTimesIndex),
          args.map((item) => item.receiveAsTokens)
        ],
      });

      const result = await toastContract(contractPost, {
        client: client!,
        pending: {
          title: "Withdraw...",
        },
        success: {
          title: "Withdraw",
        },
        failure: {
          title: "Withdraw failed",
        }
      });
      if (result.status === "success") {
        props?.onOpenChange?.(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [client, params, props, writeContractAsync]);
  
  return(
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div>Withdraw</div>
      <Form {...form}>
        <FormField 
         control={form.control}
         name="items"
        render={({field}) => {
          return         <div className="flex flex-col gap-4">
          <div className=" flex flex-col gap-2 my-8">
              {availableTokenWithdrawals.map((tw) => {
                const item = tw.asset;
                return <FormItem 
                key={item.address} 
               >
                <div className=" flex items-center">
                  <FormControl>
                  <Checkbox
                      checked={field.value?.includes(item.address)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, item.address])
                          : field.onChange(
                              field.value?.filter(
                                (value: any) => value !== item.address
                              )
                            )
                      }}
                    />
                  </FormControl>
                  <div className=" flex-grow">
                      <StakedToken 
                      key={item.address} 
                      icon={item?.logoUrl}
                      name={item.name} 
                      amount={`${formatUnits(tw.amount || BigInt(0), item.decimals)}`}
                      />
                  </div>
                  </div>
               </FormItem>
              })}
            </div>
            <div className=" w-full">
            <Button className=" w-full"

              disabled={loading}
              onClick={() => {
                handleWithdraw();
              }}
            >
            <span className="mx-2 h-4 w-4 animate-spin">
              {loading && <ReloadIcon className="h-4 w-4 animate-spin" />}
            </span>
              Withdraw
            <span className="mx-2 h-4 w-4 animate-spin">
            </span>  
            </Button>
          </div>
        </div>
        }}
        />

      </Form>
    </DialogContent>
  </Dialog>
)
});

WithdrawDialog.displayName = "WithdrawDialog"