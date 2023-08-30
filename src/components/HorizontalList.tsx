import LiveCard from "./LiveCard";
import { MatchList } from "./LiveGames";

export default function HorizontalList(props: { matchList: MatchList[] }) {
  return (
    <div className="flex flex-col pt-5">
      <div className="flex overflow-x-scroll pb-5 hide-scroll-bar">
        <div className="flex flex-nowrap  ">
          {props.matchList.map((match) => (
            <LiveCard
              location={match.location}
              name={match.name}
              sportName={match.sportName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
