'use client'
import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { SelectOperatorDialog } from "./SelectOperatorDialog";
import { UnStakeDialog } from "./dialog/UnStakeDialog";
import { WithdrawDialog } from "./dialog/WithdrawDialog";
import { UnDelegateDialog } from "./dialog/UnDelegateDialog";
import { useRetrieveQueuedWithdrawals, useRetrieveOperator, useRetrieveQueuedAndWithdrawableWithdrawals } from "@/data/eigen";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { ABI as DelegationManagerABI} from '@/abi/DelegationManager';

import { delegationManagerAddress } from "@/config/contracts";
import { Address, formatUnits } from "viem";
import { useStakedBalance } from "@/hooks/useStakedBalance";
import { assets } from "@/config/token";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toastContract } from "@/toast/contract";

export interface StakedTokenProps {
  name?: string;
  icon?: string;
  amount?: string;

}

export const StakedToken: FC<StakedTokenProps> = ({
  name,
  icon,
  amount,
}) => {
  return <div className=" flex justify-between items-center text-xl font-bold px-4">
    <div className="flex items-center gap-2">
      <img className=" h-8 w-8" src={icon} alt="" />
      <span>{name}</span>
    </div>
    <div>{amount}</div>
  </div>
}

export const QueuedWithdrawalsAsset = () => {
  const account = useAccount();

  const {data} = useRetrieveQueuedWithdrawals({
    address: account.address
  });

  // const {data} = useRetrieveQueuedAndWithdrawableWithdrawals({
  //   address: account.address
  // });

  const availableToken: any[] = useMemo(() => {
    return ((data as any)?.data || []).map((item: any) => {
      return item.shares || []
    }).flat()
  }, [data]);
  const showTokens = useMemo(() => {
    return assets.filter((asset) => {
      return availableToken.some((token) => token.strategyAddress?.toLowerCase() === asset.strategyAddress?.toLowerCase())
    })
  }, [availableToken])

  console.log("QueuedWithdrawalsAsset", data);

  return <div>
    <div className=" flex flex-col justify-between flex-grow">

      <div className=" flex justify-between items-center h-12 my-2 bg-white rounded-sm  px-4">        
        <div className="  flex items-center  text-sm text-gray-400">
          <div>In Escrow</div>
        </div>
        <div>
          {showTokens.map((item) => {
            return <div key={item.strategyAddress} className="">
              <img className=" h-6 w-6" src={item.logoUrl} />
            </div>
          })}
        </div>
      </div>

    </div>
  </div>
}


export const AvailableWithdrawalsAsset = () => {
  const account = useAccount();

  const {data} = useRetrieveQueuedAndWithdrawableWithdrawals({
    address: account.address
  });

  const availableToken: any[] = useMemo(() => {
    return ((data as any)?.data || []).map((item: any) => {
      return item.shares || []
    }).flat()
  }, [data]);
  const showTokens = useMemo(() => {
    return assets.filter((asset) => {
      return availableToken.some((token) => token.strategyAddress?.toLowerCase() === asset.strategyAddress?.toLowerCase())
    })
  }, [availableToken])
  return <div>
    <div className=" flex flex-col justify-between flex-grow">

      <div className="flex justify-between items-center bg-white h-12 my-2 px-4 rounded-sm">        
        <div className="flex items-center text-sm text-gray-400">
          <div>Available to withdraw</div>
        </div>
        <div>
          {showTokens.map((item) => {
            return <div key={item.strategyAddress} className="">
              <img className=" h-6 w-6" src={item.logoUrl} />
            </div>
          })}
        </div>
      </div>

    </div>
  </div>
}

export const StakedAssets = () => {
  const [unStakeDialog, setUnStakeDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);

  const stakedBalance = useStakedBalance();

  return <div className=" border rounded-md p-4 h-96 bg-gray-100 flex flex-col justify-between">
    <div className=" font-bold text-xl">My Staked Assets</div>
    <div className=" flex flex-col justify-between flex-grow">
      <div className=" flex flex-col gap-2 my-8">
        {stakedBalance.map((st) => {
          return <StakedToken 
          key={st.token?.address} 
          icon={st.token?.logoUrl}
          name={st.token?.name} 
          amount={`${formatUnits(st.balance, st.token?.decimals || 1)}`}
          />
        })}
      </div>

      <div>        
        <QueuedWithdrawalsAsset />
        <AvailableWithdrawalsAsset />
      </div>

    </div>
    <div className=" w-full grid grid-cols-2 gap-6">
      <UnStakeDialog open={unStakeDialog} onOpenChange={(open) => {
          setUnStakeDialog(open);
      }}/>

      <WithdrawDialog 
        open={withdrawDialog}
        onOpenChange={(open) => {
            setWithdrawDialog(open);
        }}
      />
      <Button className="place-self-center w-full" variant={"outline"} onClick={() => {
        setUnStakeDialog(true);
      }}>UnStake</Button>
      <Button className="place-self-center w-full"  variant={"outline"} onClick={() => {
        setWithdrawDialog(true);
      }}>Withdraw</Button>
    </div>
  </div>
}

export const DelegatedOperator = () => {
  const [showDialog, setShowDialog] = useState(false);

  const [unDelegateDialog, setUnDelegateDialog] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const [loading, setLoading] = useState(false);

  const { address } = useAccount();


  const {data: delegatedTo, refetch: deleteReFetch} = useReadContract({
    abi: DelegationManagerABI,
    address: delegationManagerAddress,
    functionName: "delegatedTo",
    args: [
      address as Address,
    ],
  });

  const client = usePublicClient()


  const handleUnDelegate = useCallback(async () => {
    setLoading(true);
    try {
      const contractPost = writeContractAsync({
        abi: DelegationManagerABI,
        address: delegationManagerAddress,
        functionName: "undelegate",
        args: [
          address as Address,
        ],
      });

      await toastContract(contractPost, {
        client: client!,
        pending: {
          title: "undelegate...",
        },
        success: {
          title: "undelegate",
        },
        failure: {
          title: "undelegate failed",
        }
      });
      deleteReFetch();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [address, client, deleteReFetch, writeContractAsync]);

  // const account = useAccount();

  // const { data } = useRetrieveStaker({
  //   address: account.address
  // });
  const operatorAddress = useMemo(() => {
    return delegatedTo === "0x0000000000000000000000000000000000000000" ? undefined : delegatedTo;
  }, [delegatedTo]);


  const operatorData = useRetrieveOperator({
    address: operatorAddress,
  });

  const operator = useMemo(() => {
    return operatorData?.data as any;
  }, [operatorData?.data])

  return <div className=" border rounded-md p-4 h-96 flex flex-col bg-gray-100">
    <div className=" flex justify-between">
      <div className=" font-bold text-xl">My Delegated Operator</div>
      { operatorAddress && <div>
        <Button variant={"outline"}
        disabled={loading}
        onClick={() => {
        // setUnDelegateDialog(true);
        handleUnDelegate();
      }}>
        <span className="mr-2 h-4 w-4 animate-spin">
          {loading && <ReloadIcon className="h-4 w-4 animate-spin" />}
        </span>


        UnDelegate
        <span className="ml-2 h-4 w-4 animate-spin">
        </span>
        </Button>
         <UnDelegateDialog open={unDelegateDialog} onOpenChange={(open) => {
          setUnDelegateDialog(open);
      }}/>
      </div>}
    </div>
    <div className=" flex-grow flex flex-col items-center justify-center">
      {operatorAddress ? <div className=" h-full">
          <div>
          <div className=" flex items-center gap-4 mt-8">
            <div>
              <img className="h-10 w-10 rounded-md" src={operator?.metadataLogo} />
            </div>
            <div className=" text-xl font-bold">{operator?.metadataName}</div>
            <a href={`https://holesky.eigenlayer.xyz/operator/${operator?.address}`} target="_blank">
              <div className="text-xs w-40 pt-2 truncate">
                {operator?.address}
              </div>
            </a>
          </div>


          <div className=" my-4 text-gray-500">{operator?.metadataDescription}</div>
        </div>
      </div> : <div className="flex-grow flex flex-col items-center justify-center">
      <div>
        {'You are not delegated a operator, Please delegated first'}
      </div>
      <div className=" my-4">
        <Button onClick={() => {
          setShowDialog(true);
        }}>
          Select Operator
        </Button>
        <SelectOperatorDialog open={showDialog} onOpenChange={(open) => {
            setShowDialog(open);
        }}/>
      </div>
      </div> }

    </div>

  </div>
}

export  function StakedInfo() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
      <div>
        <StakedAssets />
      </div>
      <div>
        <DelegatedOperator />
      </div>
    </div>
  );
}
