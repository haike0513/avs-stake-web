import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useRetrieveOperators } from "@/data/eigen";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";

import { useWriteContract } from "wagmi";
import { ABI as DelegationManagerABI} from '@/abi/DelegationManager';
import { delegationManagerAddress } from "@/config/contracts";
import { Address } from "viem";
import { DialogProps } from "@radix-ui/react-dialog";

interface OperatorItemProps {
  name: string;
  tvl: string;
  logo?: string;
  totalStakers?: string;
  operator?: string;
  handleDelegate?: () => void;
}

export const OperatorItem: FC<OperatorItemProps> = ({
  name,
  logo,
  handleDelegate,
}) => {
  return <div className="">
    <div className="grid grid-cols-3 items-center">
      <img className=" rounded-md" src={logo || ''}  width={40} height={40}/>
      <div>{name}</div>
      <div><Button variant={"secondary"}
        onClick={handleDelegate}
      >Delegate</Button></div>
    </div>
    </div>
}

export const SelectOperatorDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<FC<{onSelect?: (operator?: string) =>void} & DialogProps>>
>(({ onSelect, ...props }, ref) => {

  const [result] = useRetrieveOperators({page: 1});

  const list = useMemo(() => {
    return result?.data as any[];
  }, [result?.data]);


  const { writeContractAsync } = useWriteContract();

  const [, setLoading] = useState(false);

  // const { address } = useAccount();



  const handleUnDelegate = useCallback(async (operator: string) => {
    setLoading(true);
    try {
      await writeContractAsync({
        abi: DelegationManagerABI,
        address: delegationManagerAddress,
        functionName: "delegateTo",
        args: [
          operator as Address,
          {
            signature: "0x",
            expiry: BigInt(0),
          },
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [writeContractAsync]);
  
  return(
    <Dialog
      {...props}
    >
      <DialogContent ref={ref}>
        <div>Select Operator</div>
        <div className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
          {list.map((operator) => {
            return <div onClick={() => {
              onSelect?.(operator?.address);
              props?.onOpenChange?.(false);
            }}  key={operator?.address} 
             className=" hover:bg-gray-400 cursor-pointer p-2 rounded-md"
            >
            <OperatorItem 
              name={operator.metadataName}
              tvl={operator.tvl.tvl}
              logo={operator.metadataLogo}
              totalStakers={operator.totalStakers}
              operator={operator.address}
              
              handleDelegate={() => {
                handleUnDelegate(operator.address)
              }}
              />
            </div>
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
});

SelectOperatorDialog.displayName = "SelectOperatorDialog"