import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useRetrieveOperators } from "@/data/eigen";
import React, { FC, useMemo } from "react";
import { Button } from "../ui/button";

interface OperatorItemProps {
  name: string;
  tvl: string;
  logo?: string;
  totalStakers?: string;
  operator?: string;
}

export const OperatorItem: FC<OperatorItemProps> = ({
  name,
  logo,
}) => {
  return <div className="">
    <div className="grid grid-cols-3">
      <img className=" rounded-md" src={logo || ''}  width={40} height={40}/>
      <div>{name}</div>
      <div><Button variant={"secondary"}>Delegate</Button></div>
    </div>
    </div>
}

export const SelectOperatorDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => {

  const [result] = useRetrieveOperators({page: 1});

  const list = useMemo(() => {
    return result?.data as any[];
  }, [result?.data]);
  
  return(
    <Dialog
      {...props}
    >
      <DialogContent ref={ref}>
        <div>Select Operator</div>
        <div className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
          {list.map((operator) => {
            return <OperatorItem  key={operator?.address} 
            name={operator.metadataName}
            tvl={operator.tvl.tvl}
            logo={operator.metadataLogo}
            totalStakers={operator.totalStakers}
            operator={operator.address}
            />
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
});

SelectOperatorDialog.displayName = "SelectOperatorDialog"