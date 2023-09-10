import { useEffect, useState } from "react";
import {
  fetchArticles,
  fetchMatchList,
  fetchPreferences,
} from "../../utils/apiUtils";
import { article, preferences } from "../../types";
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
  const [sports, setSports] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [matches, setMatches] = useState<matches>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [animate, setAnimate] = useState(false);
  const [preferredMatches, setPreferredMatches] = useState<MatchList[]>();
  const [preferences, setPreferences] = useState<preferences>();
  const navigate = useNavigate();

  const compareMatchPreferences = (match: MatchList) => {
    if (preferences) {
      for (let i = 0; i < preferences?.team.length; i++) {
        if (
          preferences.team[i] === match.teams[0].name ||
          preferences.team[i] === match.teams[1].name
        ) {
          return true;
        }
      }
      return false;
    }
    return false;
  };

  const performSimilarityCheck = () => {
    let temp = [];
    if (matches) {
      for (let i = 0; i < matches.matches.length; i++) {
        if (compareMatchPreferences(matches.matches[i])) {
          temp.push(matches.matches[i]);
        }
      }
    }
    setPreferredMatches(temp);
  };

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
    console.log("Getting user preferred matches.");
    performSimilarityCheck();
  }, [matches, preferences]);

  useEffect(() => {
    try {
      console.log("Fetching Live Matches");
      fetchMatchList().then((res) => {
        setMatches(res);
        setLoading(false);
        setRefresh(false);
        console.log(matches);
      });
    } catch (err) {
      console.log(err);
    }
  }, [refresh]);

  useEffect(() => {
    try {
      console.log("Fetching user preferences.");
      if (localStorage.getItem("authToken")) {
        fetchPreferences().then((res) => {
          setPreferences(res.preferences);
          setLoading(false);
        });
      }
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

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleAnimation = async () => {
    setAnimate(true);
    await delay(1000);
    setAnimate(false);
  };

  const checkSportInArticle = (sport: string) => {
    if (preferences) {
      for (let i = 0; i < preferences?.sport.length; i++) {
        if (preferences.sport[i] === sport) {
          return true;
        }
      }
      return false;
    }
    return false;
  };

  const fetchPreferredArticle = () => {
    if (!localStorage.getItem("authToken")) {
      return (
        <p className="font-semibold pb-10 items-center w-full text-center">
          <span
            onClick={() => navigate("/signin")}
            className="hover:underline hover:underline-offset-4 cursor-pointer"
          >
            Log In
          </span>{" "}
          to access this feature. <span className="text-2xl">🔒</span>
        </p>
      );
    }
    if (preferences && preferences.sport.length === 0) {
      /* Displaying all articles in case preferences for sport are found missing. */
      return articles?.map((item) => {
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
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-gray-400 text-base">{item.summary}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else if (articles) {
      console.log("Fetching relevant articles.");
      let relevantArticles = [];
      for (let i = 0; i < articles?.length; i++) {
        if (checkSportInArticle(articles[i].sport.name)) {
          relevantArticles.push(articles[i]);
        }
      }
      return relevantArticles.map((item) => {
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
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-gray-400 text-base">{item.summary}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="py-5 px-[8%]">
      <div>
        <h2 className="font-bold text-2xl pt-5 pb-3 pr-2 inline">
          Live Scores
        </h2>
        <button
          onClick={() => {
            setRefresh(true);
            handleAnimation();
          }}
          className={animate ? "animate-spin" : "animate-none"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline pb-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      {matches && <LiveGames matchList={matches.matches} />}
      <h2 className="font-bold text-2xl pt-5 pb-3">
        Trending News <span className="text-2xl">🪄</span>
      </h2>
      <Tab.Group>
        <Tab.List>
          <Tab key={-1} className="outline-none">
            {({ selected }) => (
              <p
                className={
                  selected
                    ? "px-4 py-2 rounded-xl mx-2 my-2 bg-black outline-none border border-1 border-gray-700"
                    : " px-4 py-2 rounded-xl mx-2 my-2 outline-none"
                }
              >
                For You
              </p>
            )}
          </Tab>
          {sports?.map((sport, index) => (
            <Tab as={Fragment} key={index}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "px-4 py-2 rounded-xl mx-2 my-2 bg-black outline-none border border-1 border-gray-700"
                      : " px-4 py-2 rounded-xl mx-2 my-2 outline-none"
                  }
                >
                  {sport}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="bg-black py-2 px-5 border border-1 border-gray-800 rounded-2xl mt-2">
          <Tab.Panel key={-1}>
            <div>
              {preferredMatches && <LiveGames matchList={preferredMatches} />}
              {fetchPreferredArticle()}
            </div>
          </Tab.Panel>
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
