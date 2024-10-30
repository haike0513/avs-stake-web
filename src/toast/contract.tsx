import { ToastActionElement, ToastProps } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { CheckCircledIcon, CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Client } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { WriteContractData } from "wagmi/query";

export type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export type Toast = Omit<ToasterToast, "id">


export interface ContractToastProps {
  success?: Toast,
  pending?: Toast,
  failure?: Toast,
  client: Client
}

export const toastContract = async (contract: Promise<WriteContractData>, config: ContractToastProps ) => {
  const txHash = await contract;
  const pendingToast = config.pending || {};
  const instance = toast({
    duration: 100000,
    ...pendingToast,
    description: (<div className=" flex items-center">
      <ReloadIcon className="h-6 w-6 animate-spin mx-4" />
      <div>
        {pendingToast.description}
      </div>
    </div>),
    ...pendingToast,
  });

  const result = await waitForTransactionReceipt(config.client, {
    hash: txHash,
  });
  instance.dismiss();

  if (result.status === "success") {
    const successToast = config.success || {};
    toast({
      duration: 5000,
      ...successToast,
      description: (<div className=" flex items-center">
        <CheckCircledIcon color="#65BA74" className="h-6 w-6 mx-4" />
        <div>
          {successToast.description}
        </div>
      </div>),

    })
  } else if (result.status === "reverted") {
    const failureToast = config.failure || {};

    toast({
      duration: 5000,
      ...failureToast,
      description: (<div className=" flex items-center">
        <CrossCircledIcon  color="#DD4425" className="h-6 w-6 mx-4 text-red-500" />
        <div>
          {failureToast.description}
        </div>
      </div>),
      ...failureToast,
    })
  }

  return result;
}