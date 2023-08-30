// import { useEffect, useState } from "react";
// import { fetchSingleMatch } from "../utils/apiUtils";

export default function LiveCard(props: {
  id: number;
  name: string;
  location: string;
  sportName: string;
  teams: { id: number; name: string }[];
  isRunning: boolean;
}) {
  //   const [data, setData] = useState<SingleMatch>();

  //   useEffect(() => {
  //     try {
  //       console.log("Fetching Single Match");
  //       fetchSingleMatch(props.id.toString()).then((res) => {
  //         setData(res);
  //         console.log(data);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, []);

  return (
    <div className="inline-block px-3 hover:cursor-pointer">
      <div className="w-64 h-36 border-1 pt-3 pl-4 border-gray-700 border max-w-xs overflow-hidden rounded-lg shadow-md bg-[#000000] hover:shadow-xl transition-shadow duration-300 ease-in-out">
        {props.isRunning ? (
          <div className="relative flex float-right">
            <div>
              <span className="relative mr-1 flex h-2 w-2 pt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
            </div>
            <p className="float-right text-green-500 font-extrabold text-[0.75rem] pr-3">
              Live
            </p>
          </div>
        ) : (
          <p className="float-right text-red-500 font-extrabold text-[0.75rem] pr-3">
            Finished
          </p>
        )}
        <p className="font-semibold ">{props.sportName}</p>
        <p className="font-normal text-gray-400 text-[0.75rem]">
          {props.location}
        </p>
        <div className="pt-4 space-y-1">
          {props.teams.map((team) => (
            <p className="font-bold text-sm" key={team.id}>
              {team.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
