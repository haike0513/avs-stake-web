"use client"
import { FC, Suspense, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ReStakeDialog } from "./ReStakeDialog";
// import { useRetrieveOperators } from "@/data/eigen";
import { ClaimRewardDialog } from "./dialog/ClaimRewardDialog";
// import { getEigenAppURL } from "@/data/util";
// import Image from "next/image";
import { Asset, assets } from '@/config/token';
import { useTokensInfo } from "@/hooks/useTokenInfo";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";

import {BigNumber} from 'bignumber.js';
import { useStakedBalance } from "@/hooks/useStakedBalance";
import { SelectOperatorDialog } from "./SelectOperatorDialog";
import { delegationManagerAddress } from "@/config/contracts";
import { Address } from "viem";
import { ABI as DelegationManagerABI} from '@/abi/DelegationManager';

interface OperatorItem {
  name: string;
  tvl: string;
  logo?: string;
  balance?: string;
  reStakedBalance?: string;
  totalStakers?: string;
  operator?: string;
  asset?: Asset;
}
export const ReStakedAsset: FC<OperatorItem> = ({
  asset,
  name,
  // tvl,
  reStakedBalance,
  balance,
  logo,
  totalStakers,
  operator,
}) => {

  const [showDialog, setShowDialog] = useState(false);
  const [claimDialog, setClaimDialog] = useState(false);
  const [operatorDialog, setOperatorDialog] = useState(false);

  // const baseAppURL = getEigenAppURL();
  return (
    <div className=" grid grid-cols-6 rounded-lg py-4">
      <div className=" col-span-6 sm:col-span-4 grid grid-cols-4">
        <div className="flex items-center gap-2">
          {/* <Image src={logo || ''} alt="" width={40} height={40} /> */}
          <img className=" rounded-md" src={logo || ''}  width={40} height={40}/>
          <div  className=" w-32 truncate">
            {name}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div>{new BigNumber(balance || 0).toFormat(4)}</div>
        </div>
        <div className="flex justify-end items-center">
          <div>{totalStakers}</div>
        </div>
        <div className="flex justify-end items-center">
          <div>{new BigNumber(reStakedBalance || 0).toFormat(4)}</div>
        </div>
      </div>
      
      <div className="col-span-6 sm:col-span-2 flex items-center justify-center sm:justify-end gap-6 sm:gap-2 my-2 sm:my-0">
        {/* <Button variant={"outline"} onClick={() => {
            // setClaimDialog(true);
          }}>
            <a className=" w-full h-full">
              Claim
            </a>
        </Button> */}
        <ClaimRewardDialog open={claimDialog} onOpenChange={(open) => {
            setClaimDialog(open);
          }}/>
        {/* <a href={`${baseAppURL}/operator/${operator}`} target="_blank"> */}
          <Button onClick={() => {
            // setOperatorDialog(true);
            // return;

            if(!operator) {
              setOperatorDialog(true);
            } else {
              setShowDialog(true);
            }
          }}>
            Restake Now
          </Button>
          <ReStakeDialog asset={asset} open={showDialog} onOpenChange={(open) => {
            setShowDialog(open);
          }} 
          operator={operator}
          />
          <SelectOperatorDialog open={operatorDialog} onOpenChange={(open) => {
            setOperatorDialog(open);
        }}/>
        {/* </a> */}
      </div>



      
    </div>
  );
}


export  function ReStakedAssetsList() {
  return (
    <div className=" min-h-96">
      <div className=" text-2xl font-bold mt-20 mb-6">Support Restaked Assets</div>
      <div className=" border rounded-md p-6 bg-gray-100">
        <Suspense fallback={<div></div>}>
          <ReStakedAssetsPages />
        </Suspense>
      </div>
    </div>
  );
}


export  function ReStakedAssetsPages() {
  const account = useAccount();
  const { balances } = useTokensInfo(assets, account.address as string, account?.chainId as number );
  const tokens = useMemo(() => {
    return balances
  }, [balances]);
  const stakedBalanced = useStakedBalance();
  const {address} = useAccount();
  const {data: delegatedTo} = useReadContract({
    abi: DelegationManagerABI,
    address: delegationManagerAddress,
    functionName: "delegatedTo",
    args: [
      address as Address,
    ],
  });
  return (
    <div className="flex flex-col gap-2">
      <div className=" grid grid-cols-6">
        <div className="col-span-6 sm:col-span-4 grid grid-cols-4">
          <div className="flex justify-start items-center font-bold">Assets</div>
          <div className="flex justify-end items-center font-bold">Wallet Balance</div>
          <div className="flex justify-end items-center font-bold">Available to withdraw</div>
          <div className="flex justify-end items-center font-bold">Restaked Balance</div>
        </div>
        <div className="col-span-6 sm:col-span-2"></div>
      </div>
      <div className=" flex flex-col gap-2">
        {tokens.map((item) => {
          const staked = stakedBalanced.find((st) => {
            return st.token?.address.toLowerCase() === item.address.toLowerCase();
          })
          return <ReStakedAsset key={item?.address} 
          asset={item}
          reStakedBalance={formatUnits(staked?.balance || BigInt(0), item.decimals)}
          balance={formatUnits(item.balance as bigint, item.decimals)}
            name={item.name}
            tvl={item.name}
            logo={item.logoUrl}
            totalStakers={"0"}
            operator={delegatedTo}
          />
        })}
      </div>

    </div>
  );
}