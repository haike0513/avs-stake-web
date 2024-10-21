import { HomeHeader } from "@/components/Header";
// import { HomeTitle } from "./Title";
// import { OperatorList } from "./OperatorList";
import { JoinUs } from "./JoinUs";
import { StakedInfo } from "./StakedInfo";
import { ReStakedAssetsList } from "./ReStakedAssetsList";

export default function Home() {
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
