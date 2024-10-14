"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { ReStakeDialog } from "./ReStakeDialog";

export  function OperatorItem() {

  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="flex items-center justify-between bg-[#e0e0e0] rounded-lg p-4">
      <div>Ether.fi</div>
      <div>
        <div>Total AuM</div>
      </div>
      <div></div>
      <div>
        <Button onClick={() => {
          setShowDialog(true);
        }}>ReStake Now</Button>
        <ReStakeDialog open={showDialog} onOpenChange={(open) => {
          setShowDialog(open);
        }}/>
      </div>



      
    </div>
  );
}


export  function OperatorList() {
  return (
    <div className=" min-h-96 flex flex-col gap-2">
      <OperatorItem />
      <OperatorItem />
      <OperatorItem />
    </div>
  );
}
