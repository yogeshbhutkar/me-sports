import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/signin";
import Dashboard from "../pages/dashboard";
import ProtectedRoutes from "./ProtectedRoute";
import Modal from "../components/Modal";
import Logout from "../pages/logout";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/article/:id",
    element: (
      <ProtectedRoutes>
        <Modal />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
