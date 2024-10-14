import { HomeHeader } from "@/components/Header";
import { HomeTitle } from "./Title";
import { OperatorList } from "./OperatorList";
import { JoinUs } from "./JoinUs";

export default function Home() {
  return (
    <div className=" w-full mx-auto max-w-7xl px-4">
      <HomeHeader />
      <HomeTitle />
      <OperatorList />
      <JoinUs />
    </div>
  );
}
