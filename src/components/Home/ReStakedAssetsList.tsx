"use client"
import { FC, Suspense, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ReStakeDialog } from "./ReStakeDialog";
import { useRetrieveOperators } from "@/data/eigen";
import { ClaimRewardDialog } from "./dialog/ClaimRewardDialog";
// import { getEigenAppURL } from "@/data/util";
// import Image from "next/image";

interface OperatorItem {
  name: string;
  tvl: string;
  logo?: string;
  totalStakers?: string;
  operator?: string;
}
export const ReStakedAsset: FC<OperatorItem> = ({
  name,
  tvl,
  logo,
  totalStakers,
  // operator,
}) => {

  const [showDialog, setShowDialog] = useState(false);
  const [claimDialog, setClaimDialog] = useState(false);

  // const baseAppURL = getEigenAppURL();
  return (
    <div className=" grid grid-cols-6 rounded-lg py-4">
      <div className="flex items-center gap-2">
        {/* <Image src={logo || ''} alt="" width={40} height={40} /> */}
        <img className=" rounded-md" src={logo || ''}  width={40} height={40}/>
        <div  className=" w-32 truncate">
          {name}
        </div>
      </div>
      <div>
        <div>{tvl}</div>
      </div>
      <div>
        <div>{totalStakers}</div>
      </div>
      <div>
        <div>{totalStakers}</div>
      </div>
      
      <div className=" col-span-2 flex items-center justify-end gap-2">
        <Button variant={"outline"} onClick={() => {
            setClaimDialog(true);
          }}>
            Claim
        </Button>
        <ClaimRewardDialog open={claimDialog} onOpenChange={(open) => {
            setClaimDialog(open);
          }}/>
        {/* <a href={`${baseAppURL}/operator/${operator}`} target="_blank"> */}
          <Button onClick={() => {
            setShowDialog(true);
          }}>
            ReStake Now
          </Button>
          <ReStakeDialog open={showDialog} onOpenChange={(open) => {
            setShowDialog(open);
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
        <Suspense fallback={<div>waiting 100....</div>}>
          <ReStakedAssetsPages />
        </Suspense>
      </div>
    </div>
  );
}


export  function ReStakedAssetsPages() {

  const [result] = useRetrieveOperators({page: 1});

  const list = useMemo(() => {
    return result?.data as any[];
  }, [result?.data]);
  return (
    <div className="flex flex-col gap-2">
      <div className=" grid grid-cols-6">
        <div>Assets</div>
        <div>Wallet Balance</div>
        <div>Available to withdraw</div>
        <div>ReStaked Balance</div>
        <div className=" col-span-2"></div>
      </div>
      <div className=" flex flex-col gap-2">
        {list.map((item) => {
          return <ReStakedAsset key={item?.address} 
            name={item.metadataName}
            tvl={item.tvl.tvl}
            logo={item.metadataLogo}
            totalStakers={item.totalStakers}
            operator={item.address}
          />
        })}
      </div>

    </div>
  );
}