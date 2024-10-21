import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React from "react";

export const SelectOperatorDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => (
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div>Select Operator</div>
      <div className="flex flex-col gap-4">
        <div>Operator</div>
        <div>Operator</div>
        <div>Operator</div>
      </div>
    </DialogContent>
  </Dialog>
));

SelectOperatorDialog.displayName = "SelectOperatorDialog"