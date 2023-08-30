import { useEffect, useState } from "react";
import { fetchArticles, fetchMatchList } from "../../utils/apiUtils";
import { article } from "../../types";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import LiveGames, { MatchList } from "../../components/LiveGames";

type matches = {
  matches: MatchList[];
};

export default function DashboardView() {
  const [articles, setArticles] = useState<article[]>();
  const [sports, setSports] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [matches, setMatches] = useState<matches>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("Fetching Articles");
      fetchArticles().then((res) => {
        setArticles(res);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      console.log("Fetching Live Matches");
      fetchMatchList().then((res) => {
        setMatches(res);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    //Storing different sports...
    articles?.map((item) =>
      setSports((prev) => [...(prev ?? []), item.sport.name])
    );

    //Removing duplicate entries.
    setSports((prev) => [...new Set(prev)]);

    //Storing in alphabetical order.
    setSports((prev) => prev?.sort());
  }, [articles]);

  return (
    <div className="py-5 px-[8%]">
      {matches && <LiveGames matchList={matches.matches} />}
      <h2 className="font-bold text-2xl pt-5 pb-3">Articles</h2>
      <Tab.Group>
        <Tab.List>
          {sports?.map((sport, index) => (
            <Tab as={Fragment} key={index}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white text-black px-4 py-2 rounded-xl mx-2 my-2 border border-white"
                      : "bg-black px-4 py-2 rounded-xl mx-2 my-2 border border-gray-700"
                  }
                >
                  {sport}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {loading ? (
            <div className="w-full my-36 flex items-center justify-center">
              <ClipLoader
                color={"#ffffff"}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            sports?.map((sport, index) => (
              <Tab.Panel key={sport.length + index}>
                {articles?.map((item) => {
                  if (item.sport.name === sport)
                    return (
                      <div key={item.id} className="hover:cursor-pointer">
                        <div
                          onClick={() => navigate(`/article/${item.id}`)}
                          className="w-full"
                        >
                          <div className="max-w-full rounded-2xl flex mx-2 my-4 overflow-hidden bg-black text-white shadow-lg  border border-gray-700">
                            <div className="">
                              <img
                                className="h-52 w-64 object-cover items-center"
                                src={item.thumbnail}
                                alt="Thumbnail"
                              />
                            </div>
                            <div className="px-6 py-4 inline">
                              <div className="font-bold text-xl mb-2">
                                {item.title}
                              </div>
                              <p className="text-gray-400 text-base">
                                {item.summary}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
              </Tab.Panel>
            ))
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
