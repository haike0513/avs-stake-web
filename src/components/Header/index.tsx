"use client";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { WalletDialog } from "../Wallet/WalletDialog";
import { ConnectButton } from '@rainbow-me/rainbowkit';


export  function HomeHeader() {
  // const [showDialog, setShowDialog] = useState(false);
  return (
    <div className=" flex justify-between py-6">
      <div>AOS Network</div>
      <div>
        <ConnectButton />
        {/* <Button
          onClick={() => {
            setShowDialog(true);
          }}
        >
          Connect Wallet
        </Button>
        <WalletDialog open={showDialog} onOpenChange={(open) => {
          setShowDialog(open)
        }}/> */}
      </div>
      
    </div>
  );
}
