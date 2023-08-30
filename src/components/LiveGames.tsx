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
      <HorizontalList matchList={props.matchList} />
    </div>
  );
}
