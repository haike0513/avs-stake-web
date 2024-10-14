import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React from "react";
import { Button } from "../ui/button";

export const ReStakeDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => (
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div>Restaking Assets</div>
      <div className="flex flex-col gap-4">
        <div>USDT</div>
        <div>ETH</div>
        <div>DAI</div>
      </div>
      <div className="flex items-center justify-center">
        <Button>ReStake</Button>
      </div>
    </DialogContent>
  </Dialog>
));

ReStakeDialog.displayName = "ReStakeDialog"