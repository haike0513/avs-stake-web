import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React from "react";

export const WithdrawDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => (
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div>Withdraw</div>
      <div className="flex flex-col gap-4">
        <div>Operator</div>
        <div>Operator</div>
        <div>Operator</div>
      </div>
    </DialogContent>
  </Dialog>
));

WithdrawDialog.displayName = "WithdrawDialog"