"use client"
import { FC, Suspense, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ReStakeDialog } from "./ReStakeDialog";
import { useRetrieveOperators } from "@/data/eigen";
// import Image from "next/image";

interface OperatorItem {
  name: string;
  tvl: string;
  logo?: string;
  totalStakers?: string;
  operator?: string;
}
export const OperatorItem: FC<OperatorItem> = ({
  name,
  tvl,
  logo,
  totalStakers,
  operator,
}) => {

  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="flex items-center justify-between bg-[#e0e0e0] rounded-lg p-4">
      <div className="flex items-center gap-2">
        {/* <Image src={logo || ''} alt="" width={40} height={40} /> */}
        <img className=" rounded-md" src={logo || ''}  width={40} height={40}/>
        <div  className=" w-32 truncate">
          {name}
        </div>
      </div>
      <div>
        <div>Total TVL</div>
        <div>{tvl}</div>
      </div>
      <div>
        <div>Total Stakers</div>
        <div>{totalStakers}</div>
      </div>
      <div>

      </div>
      <div>
        <a href={`https://app.eigenlayer.xyz/operator/${operator}`} target="_blank">
          <Button onClick={() => {
            // setShowDialog(true);
          }}>
            ReStake Now
          </Button>
        </a>
        <ReStakeDialog open={showDialog} onOpenChange={(open) => {
          setShowDialog(open);
        }}/>
      </div>



      
    </div>
  );
}


export  function OperatorList() {
  return (
    <div className=" min-h-96">
      <Suspense fallback={<div>waiting 100....</div>}>
        <OperatorPages />
      </Suspense>
    </div>
  );
}


export  function OperatorPages() {

  const [result] = useRetrieveOperators({page: 1});

  const list = useMemo(() => {
    return result?.data as any[];
  }, [result?.data]);
  return (
    <div className="flex flex-col gap-2">
      {list.map((item) => {
        return <OperatorItem key={item?.address} 
          name={item.metadataName}
          tvl={item.tvl.tvl}
          logo={item.metadataLogo}
          totalStakers={item.totalStakers}
          operator={item.address}
        />
      })}
    </div>
  );
}