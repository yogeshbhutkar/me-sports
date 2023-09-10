import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  fetchPreferences,
  fetchSports,
  fetchTeams,
  patchPreferences,
} from "../utils/apiUtils";
import { teams, sport } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [sports, setSports] = useState<sport[]>();
  const [teams, setTeams] = useState<teams[]>();
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sportPreferences, setSportPreferences] = useState<string[]>([]);
  const [teamsPreferences, setTeamPreferences] = useState<string[]>([]);

  const notify = () =>
    toast.success("🦄 Data saved successfully.", {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    try {
      console.log("Fetching user preferences.");
      fetchPreferences().then((res) => {
        setSportPreferences(res.preferences.sport);
        setTeamPreferences(res.preferences.team);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const checkSportsList = (sport: string) => {
    for (let i = 0; i < sportPreferences.length; i++) {
      if (sportPreferences[i] === sport) {
        return true;
      }
    }
    return false;
  };

  const checkTeamsList = (team: string) => {
    for (let i = 0; i < teamsPreferences.length; i++) {
      if (teamsPreferences[i] === team) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    try {
      console.log("fetching sports list");
      fetchSports().then((res) => {
        setSports(res.sports);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    try {
      console.log("fetching teams list");
      fetchTeams().then((res) => {
        setTeams(res);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderButton = (sport: string) => {
    if (checkSportsList(sport)) {
      return "Remove";
    } else {
      return "Follow";
    }
  };

  const renderTeamButton = (team: string) => {
    if (checkTeamsList(team)) {
      return "Remove";
    } else {
      return "Follow";
    }
  };

  useEffect(() => {
    console.log(sportPreferences);
  }, [sportPreferences]);

  useEffect(() => {
    console.log(teamsPreferences);
  }, [teamsPreferences]);

  const handlePatch = () => {
    patchPreferences(teamsPreferences, sportPreferences).then(() => {
      console.log("Successfully uploaded the data to the server");
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          navigate(-1);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0D1117] bg-opacity-75 transition-opacity " />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
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
                <Dialog.Panel className="relative bg-black border w- border-gray-700 transform overflow-hidden pr-4 rounded-xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="sm:flex  sm:items-start my-5">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                        <h1 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-extrabold">
                          Let's personalize your dashboard.
                        </h1>
                        <h4 className="text-white font-bold text-xl mt-8 mb-1">
                          Pick a sport <span className="text-2xl">🏀</span>
                        </h4>
                        <div className="pt-3 mt-3 bg-[#0D1117] p-5 rounded-xl border-gray-800 border border-1">
                          {sports &&
                            sports.map((sport) => (
                              <div
                                key={sport.id}
                                className="justify-between items-center flex"
                              >
                                <p className="text-gray-200 font-bold inline">
                                  {sport.name}
                                </p>
                                <button
                                  onClick={() => {
                                    if (checkSportsList(sport.name)) {
                                      const filteredSports =
                                        sportPreferences.filter(
                                          (item) => item !== sport.name
                                        );
                                      setSportPreferences(filteredSports);
                                    } else {
                                      setSportPreferences((prev: string[]) => [
                                        ...prev,
                                        sport.name,
                                      ]);
                                    }
                                  }}
                                  className="inline mt-3 bg-black border border-1 border-gray-700 text-white text-sm font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
                                >
                                  {renderButton(sport.name)}
                                </button>
                              </div>
                            ))}
                        </div>
                        <h4 className="text-white font-bold text-xl mt-8 mb-1">
                          Pick a team <span className="text-3xl">🤼</span>
                        </h4>
                        <div className="pt-3 mt-3 bg-[#0D1117] p-5 rounded-xl border-gray-800 border border-1">
                          {teams &&
                            teams.map((team) => (
                              <div
                                key={team.id}
                                className="justify-between items-center py-2 flex"
                              >
                                <div className="inline items-center">
                                  <p className="text-gray-200 font-bold ">
                                    {team.name}
                                  </p>
                                  <p className="text-gray-200 text-sm ">
                                    {team.plays}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    if (checkTeamsList(team.name)) {
                                      const filteredSports =
                                        teamsPreferences.filter(
                                          (item) => item !== team.name
                                        );
                                      setTeamPreferences(filteredSports);
                                    } else {
                                      setTeamPreferences((prev: string[]) => [
                                        ...prev,
                                        team.name,
                                      ]);
                                    }
                                  }}
                                  className="inline mt-3 bg-black border border-1 border-gray-700 text-white text-sm font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
                                >
                                  {renderTeamButton(team.name)}
                                </button>
                              </div>
                            ))}
                        </div>
                        <button
                          onClick={async () => {
                            handlePatch();
                            notify();
                            await delay(2500);
                            toast("Redirecting to homepage. ", {
                              position: "top-right",
                              autoClose: 500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            });
                            await delay(1500);
                            setOpen(false);
                            navigate("/article");
                          }}
                          className="w-full mt-10 bg-white border border-1 border-gray-700 text-black font-semibold py-2 px-10 rounded-md focus:outline-none focus:shadow-outline-gray"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
          <ToastContainer />
        </div>
      </Dialog>
    </Transition.Root>
  );
}
