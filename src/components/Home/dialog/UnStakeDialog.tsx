import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { AssetMap } from "@/config/token";
import { useRetrieveStaker } from "@/data/eigen";
import React, { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { StakedToken } from "../StakedInfo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export const UnStakeDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => {

  const form = useForm();
  
  const account = useAccount();

  const {data} = useRetrieveStaker({
    address: account.address
  });
  const tvlStrategies = useMemo(() => {
    return Object.entries((data as any)?.tvl?.tvlStrategies || {});
  }, [data])


  const [checkedToken, setCheckedToken] = useState("");
  
  return(
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div className=" font-bold text-xl">Available to Unstake</div>
      <div className="flex flex-col gap-4">

      <div className=" flex flex-col gap-2 my-8">
        {tvlStrategies.map((tvl) => {
            return <div className=" flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-sm" key={tvl[0]} 
              onClick={() => {
                setCheckedToken(tvl[0])
              }}
            >
              <Checkbox  checked={checkedToken === tvl[0] }/>
              <div className=" flex-grow">

                <StakedToken 
                key={tvl[0]} 
                icon={AssetMap[tvl[0]]?.logoUrl}
                name={tvl[0]} 
                amount={`${tvl[1] || 0}`}
                />
              </div>
            </div>
          })}
        </div>
        <div className=" w-full">
          <div>
            Unstake {checkedToken}
          </div>
          <div className="my-6 flex items-center gap-6">
            <div className="flex items-center justify-center gap-2 w-20">
              {AssetMap[checkedToken]?.logoUrl && <img className="w-6 h-6 rounded-md" src={AssetMap[checkedToken]?.logoUrl}/>}
              <div>{checkedToken}</div>
            </div>
            <div className=" flex-grow">
              <Form {...form}>
                <FormField 
                  control={form.control}
                  name="amount"
                  render={({field}) => {
                    return<Input type="number" {...field}/>
                  }}
                />
              </Form>
            </div>
            {/* <div className=" w-20"></div> */}
          </div>
          <Button className=" w-full">UnStake</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
});

UnStakeDialog.displayName = "UnStakeDialog"