import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useRetrieveStaker } from "@/data/eigen";
import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { StakedToken } from "../StakedInfo";
import { AssetMap } from "@/config/token";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export const WithdrawDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog>
>(({  ...props }, ref) => {


  const form = useForm({
    defaultValues: {
      items: [] as string[],
    }
  });


  const account = useAccount();

  const {data} = useRetrieveStaker({
    address: account.address
  });
  const tvlStrategies = useMemo(() => {
    return Object.entries((data as any)?.tvl?.tvlStrategies || {});
  }, [data])
  
  
  
  return(
  <Dialog
    {...props}
  >
    <DialogContent ref={ref}>
      <div>Withdraw</div>
      <Form {...form}>
        <FormField 
         control={form.control}
         name="items"
        render={({field}) => {
          return         <div className="flex flex-col gap-4">
          <div className=" flex flex-col gap-2 my-8">
              {tvlStrategies.map((item) => {
                return <FormItem 
                key={item[0]} 
               >
                <div className=" flex items-center">
                  <FormControl>
                  <Checkbox
                      checked={field.value?.includes(item[0])}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, item[0]])
                          : field.onChange(
                              field.value?.filter(
                                (value: any) => value !== item[0]
                              )
                            )
                      }}
                    />
                  </FormControl>
                  <div className=" flex-grow">
                      <StakedToken 
                      key={item[0]} 
                      icon={AssetMap[item[0]]?.logoUrl}
                      name={item[0]} 
                      amount={`${item[1] || 0}`}
                      />
                  </div>
                  </div>
               </FormItem>
              })}
            </div>
            <div className=" w-full">
            <Button className=" w-full">Withdraw</Button>
          </div>
        </div>
        }}
        />

      </Form>
    </DialogContent>
  </Dialog>
)
});

WithdrawDialog.displayName = "WithdrawDialog"