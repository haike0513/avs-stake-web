import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useRetrieveOperators } from "@/data/eigen";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";

import { usePublicClient, useWriteContract } from "wagmi";
import { ABI as DelegationManagerABI} from '@/abi/DelegationManager';
import { delegationManagerAddress } from "@/config/contracts";
import { Address } from "viem";
import { DialogProps } from "@radix-ui/react-dialog";
import { waitForTransactionReceipt } from "viem/actions";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

interface OperatorItemProps {
  name: string;
  tvl: string;
  logo?: string;
  totalStakers?: string;
  operator?: string;
  handleDelegate?: () => void;
}

export const OperatorItem: FC<OperatorItemProps> = ({
  name,
  logo,
  operator,
}) => {


  const { writeContractAsync } = useWriteContract();

  const [loading, setLoading] = useState(false);

  const client = usePublicClient();

  const { toast } = useToast()


  const handleDelegateAction = useCallback(async (operator: string) => {
    setLoading(true);
    let instance
    try {
      const txHash = await writeContractAsync({
        abi: DelegationManagerABI,
        address: delegationManagerAddress,
        functionName: "delegateTo",
        args: [
          operator as Address,
          {
            signature: "0x",
            expiry: BigInt(0),
          },
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
      });
        instance = toast({
        duration: 100000,
        title: "Undelegating",
        description: (<div className=" flex items-center">
          <ReloadIcon className="h-6 w-6 animate-spin mx-4" />
          <div>Undelegating</div>
        </div>)
      })
      await waitForTransactionReceipt(client!, {
        hash: txHash,
      })
    } catch (error) {
      console.log(error);
    }
    instance?.dismiss()
    setLoading(false);
  }, [client, toast, writeContractAsync]);
  return <div className="">
    <div className="grid grid-cols-3 items-center">
      <img className=" rounded-md" src={logo || ''}  width={40} height={40}/>
      <div>{name}</div>
      <div><Button variant={"secondary"}
        disabled={loading}
        onClick={(e) => {
          e.stopPropagation();
          // e.preventDefault();
          handleDelegateAction(operator!)
        }}
      >
        <span className="mr-2 h-4 w-4 animate-spin">
              {loading && <ReloadIcon className="h-4 w-4 animate-spin" />}
            </span>
        Delegate
        <span className="mr-2 h-4 w-4 animate-spin">
        </span>
        </Button></div>
    </div>
    </div>
}

export const SelectOperatorDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<FC<{onSelect?: (operator?: string) =>void} & DialogProps>>
>(({ onSelect, ...props }, ref) => {

  const [result] = useRetrieveOperators({page: 1});

  const list = useMemo(() => {
    const originData = (result?.data || []) as any[];
    const baseOperator = [
      {
        "address": "0x18e5b5bb07f289a08103d71c4138779232153255",
        "metadataName": "AOS Operator",
        "metadataDescription": "Backed by crypto-native degens, CoinSummer is a trusted liquidity provider, staking validator, and AVS operator supporting the crypto and DeFi evolution.",
        "metadataDiscord": "",
        "metadataLogo": "https://raw.githubusercontent.com/CoinSummer/eigenlayer-operator/main/logo.png",
        "metadataTelegram": "",
        "metadataWebsite": "https://coinsummer.io/",
        "metadataX": "https://twitter.com/CoinSummerLabs",
        "totalStakers": 13,
        "totalAvs": 15,
        "apy": "0",
        "createdAtBlock": 1218562,
        "updatedAtBlock": 1219853,
        "createdAt": "2024-03-26T06:53:12.000Z",
        "updatedAt": "2024-03-26T11:33:12.000Z",
        "shares": [
            {
                "strategyAddress": "0x7d704507b76571a51d9cae8addabbfd0ba0e63d3",
                "shares": "48987256770815258065"
            },
            {
                "strategyAddress": "0x7673a47463f80c6a3553db9e54c8cdcd5313d0ac",
                "shares": "12608000000000000000"
            },
            {
                "strategyAddress": "0x31b6f59e1627cefc9fa174ad03859fc337666af7",
                "shares": "1710000000000000000000"
            },
            {
                "strategyAddress": "0x80528d6e9a2babfc766965e0e26d5ab08d9cfaf9",
                "shares": "61950000000000000000"
            },
            {
                "strategyAddress": "0x46281e3b7fdcacdba44cadf069a94a588fd4c6ef",
                "shares": "357827276154055706"
            }
        ],
        "avsRegistrations": [
            {
                "avsAddress": "0x18a74e66cc90f0b1744da27e72df338cea0a542b",
                "isActive": true
            },
            {
                "avsAddress": "0x234c91abd960b72e63d5e63c8246a259f3827ac8",
                "isActive": true
            },
            {
                "avsAddress": "0x4665af665df5703445645d243f0fd63ed3b9d132",
                "isActive": true
            },
            {
                "avsAddress": "0x4fc1132230fe16f67531d82acbb9d78993b23825",
                "isActive": true
            },
            {
                "avsAddress": "0x58f280bebe9b34c9939c3c39e0890c81f163b623",
                "isActive": true
            },
            {
                "avsAddress": "0x7a46219950d8a9bf2186549552da35bf6fb85b1f",
                "isActive": true
            },
            {
                "avsAddress": "0x80fe337623bc849f4b7379f4ab28af2b470bea98",
                "isActive": true
            },
            {
                "avsAddress": "0xa7b2e7830c51728832d33421670dbbe30299fd92",
                "isActive": true
            },
            {
                "avsAddress": "0xa987ec494b13b21a8a124f8ac03c9f530648c87d",
                "isActive": true
            },
            {
                "avsAddress": "0xae9a4497dee2540daf489beddb0706128a99ec63",
                "isActive": true
            },
            {
                "avsAddress": "0xc76e477437065093d353b7d56c81ff54d167b0ab",
                "isActive": true
            },
            {
                "avsAddress": "0xd36b6e5eee8311d7bffb2f3bb33301a1ab7de101",
                "isActive": true
            },
            {
                "avsAddress": "0xd4a7e1bd8015057293f0d0a557088c286942e84b",
                "isActive": false
            },
            {
                "avsAddress": "0xde93e0da148e1919bb7f33cd8847f96e45791210",
                "isActive": true
            },
            {
                "avsAddress": "0xf98d5de1014110c65c51b85ea55f73863215cc10",
                "isActive": true
            },
            {
                "avsAddress": "0xf9b555d1d5be5c24ad9b11a87409d7107a8b6174",
                "isActive": true
            }
        ],
        "tvl": {
            "tvl": 1882.1494671619303,
            "tvlBeaconChain": 0,
            "tvlWETH": 61.95,
            "tvlRestaking": 1882.1494671619303,
            "tvlStrategies": {
                "stETH": 49.42662365043134,
                "ankrETH": 12.608,
                "ETHx": 1710,
                "WETH": 61.95,
                "osETH": 0.3578272761540557
            },
            "tvlStrategiesEth": {
                "stETH": 49.40579472418255,
                "ankrETH": 14.382949829096455,
                "ETHx": 1756.1222401978782,
                "WETH": 61.86964716880273,
                "osETH": 0.3688352419702816
            }
        }
    }

    ]
    return [...baseOperator,...originData] ;
  }, [result?.data]);


  const { writeContractAsync } = useWriteContract();

  const [, setLoading] = useState(false);

  // const { address } = useAccount();



  const handleDelegate = useCallback(async (operator: string) => {
    setLoading(true);
    try {
      await writeContractAsync({
        abi: DelegationManagerABI,
        address: delegationManagerAddress,
        functionName: "delegateTo",
        args: [
          operator as Address,
          {
            signature: "0x",
            expiry: BigInt(0),
          },
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [writeContractAsync]);
  
  return(
    <Dialog
      {...props}
    >
      <DialogContent ref={ref}>
        <div>Select Operator</div>
        <div className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
          {list.map((operator) => {
            return <div onClick={() => {
              onSelect?.(operator?.address);
              props?.onOpenChange?.(false);
            }}  key={operator?.address} 
             className=" hover:bg-gray-400 cursor-pointer p-2 rounded-md"
            >
            <OperatorItem 
              name={operator.metadataName}
              tvl={operator.tvl.tvl}
              logo={operator.metadataLogo}
              totalStakers={operator.totalStakers}
              operator={operator.address}
              
              handleDelegate={() => {
                handleDelegate(operator.address)
              }}
              />
            </div>
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
});

SelectOperatorDialog.displayName = "SelectOperatorDialog"