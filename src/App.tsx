import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Provider, useAtom, useSetAtom } from "jotai";
import { loginAtom } from "./userAtom";

const App = () => {
  const setLoginAtom = useSetAtom(loginAtom);
  if (localStorage.getItem("userData")) {
    localStorage.setItem("loggedIn", "true");
    setLoginAtom({
      loggedIn: true,
    });
  } else {
    setLoginAtom({
      loggedIn: false,
    });
    localStorage.setItem("loggedIn", "false");
  }
  return (
    <Provider>
      <div className={`min-h-screen w-full mx-auto bg-[#0D1117] text-white`}>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};
export default App;
