import LiveCard from "./LiveCard";
import { MatchList } from "./LiveGames";

export default function HorizontalList(props: { matchList: MatchList[] }) {
  return (
    <div className="flex flex-col pt-5">
      <div className="flex overflow-x-scroll pb-5 hide-scroll-bar">
        <div className="flex flex-nowrap  ">
          {props.matchList
            .sort(
              (a, b) =>
                Date.parse(b.endsAt.toString()) -
                Date.parse(a.endsAt.toString())
            )
            .slice(0, 5)
            .map((match) => (
              <LiveCard
                key={match.id}
                id={match.id}
                location={match.location}
                name={match.name}
                sportName={match.sportName}
                teams={match.teams}
                isRunning={match.isRunning}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
