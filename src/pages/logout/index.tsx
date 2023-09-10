import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { loginAtom } from "../../userAtom";

const Logout = () => {
  const setUserAtom = useSetAtom(loginAtom);

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.setItem("loggedIn", "false");
    setUserAtom({
      loggedIn: false,
    });
  }, []);

  return <Navigate to="/signin" />;
};

export default Logout;
