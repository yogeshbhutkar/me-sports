// import { useEffect, useState } from "react";
// import { fetchSingleMatch } from "../utils/apiUtils";

export default function LiveCard(props: {
  id: number;
  name: string;
  location: string;
  sportName: string;
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
        <p className="font-semibold ">{props.sportName}</p>
        <p className="font-normal text-gray-400 text-[0.75rem]">
          {props.location}
        </p>
      </div>
    </div>
  );
}
