'use client'
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { SelectOperatorDialog } from "./SelectOperatorDialog";
import { UnStakeDialog } from "./dialog/UnStakeDialog";
import { WithdrawDialog } from "./dialog/WithdrawDialog";
import { UnDelegateDialog } from "./dialog/UnDelegateDialog";

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

export const StakedAssets = () => {
  const [unStakeDialog, setUnStakeDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);

  return <div className=" border rounded-md p-4 h-96 bg-gray-100 flex flex-col justify-between">
    <div className=" font-bold text-xl">My Staked Assets</div>
    <div className=" flex flex-col justify-between flex-grow">
      <div className=" flex flex-col gap-2 my-8">
        <StakedToken icon="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" name="BTC" 
        amount="100"
        />
        <StakedToken icon="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" name="ETH" 
        amount="100"
        />
      </div>

      <div>        
        <div className=" bg-white rounded-sm h-12 my-2 flex items-center px-4 text-sm text-gray-400">
          <div>In Escrow</div>
        </div>
        <div className=" bg-white rounded-sm h-12 my-2 flex items-center px-4 text-sm text-gray-400">
          <div>Available to withdraw</div>
        </div>
      </div>

    </div>
    <div className=" w-full grid grid-cols-2 gap-6">
      <UnStakeDialog open={unStakeDialog} onOpenChange={(open) => {
          setUnStakeDialog(open);
      }}/>

      <WithdrawDialog open={withdrawDialog} onOpenChange={(open) => {
          setWithdrawDialog(open);
      }}/>
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


  return <div className=" border rounded-md p-4 h-96 flex flex-col bg-gray-100">
    <div className=" flex justify-between">
      <div className=" font-bold text-xl">My Delegated Operator</div>
      <div>
        <Button variant={"outline"} onClick={() => {
        setUnDelegateDialog(true);
      }}>UnDelegate</Button>
         <UnDelegateDialog open={unDelegateDialog} onOpenChange={(open) => {
          setUnDelegateDialog(open);
      }}/>
      </div>
    </div>
    <div className=" flex-grow flex items-center justify-center">

      <Button onClick={() => {
        setShowDialog(true);
      }}>
        Select Operator
      </Button>
      <SelectOperatorDialog open={showDialog} onOpenChange={(open) => {
          setShowDialog(open);
      }}/>
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
