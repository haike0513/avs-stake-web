import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React from "react";
import { Button } from "../ui/button";

export const WalletDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => (
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div>Wallet</div>
      <div className="flex flex-col gap-4">
        <div>MetaMask</div>
        <div>MetaMask</div>
        <div>MetaMask</div>
      </div>
      <div className="flex items-center justify-center">
        <Button>Connect</Button>
      </div>
    </DialogContent>
  </Dialog>
));

WalletDialog.displayName = "WalletDialog"