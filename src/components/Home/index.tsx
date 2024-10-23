"use client";
import { HomeHeader } from "@/components/Header";
// import { HomeTitle } from "./Title";
// import { OperatorList } from "./OperatorList";
import { JoinUs } from "./JoinUs";
import { StakedInfo } from "./StakedInfo";
import { ReStakedAssetsList } from "./ReStakedAssetsList";
// import { useTokensInfo } from "@/hooks/useTokenInfo";
// import { assets } from "@/config/token";
// import { useAccount } from 'wagmi'


export default function Home() {
  // const account = useAccount();
  // const { balances } = useTokensInfo(assets, account.address as string, account?.chainId as number );
  return (
    <div className=" w-full mx-auto max-w-7xl px-4">
      <HomeHeader />
      <StakedInfo />
      {/* <HomeTitle /> */}
      {/* <OperatorList /> */}
      <ReStakedAssetsList />
      <JoinUs />
    </div>
  );
}
