import HorizontalList from "./HorizontalList";

export type MatchList = {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: Date;
  isRunning: boolean;
  teams: {
    id: number;
    name: string;
  }[];
};

export default function LiveGames(props: { matchList: MatchList[] }) {
  return (
    <div>
      <h2 className="font-bold text-2xl pt-5 pb-3">Live Games</h2>
      <HorizontalList matchList={props.matchList} />
    </div>
  );
}
