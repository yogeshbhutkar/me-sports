import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignIn from "../pages/signin";
import Dashboard from "../pages/dashboard";
import ProtectedRoutes from "./ProtectedRoute";
import Modal from "../components/Modal";
import Logout from "../pages/logout";
import Signup from "../pages/signup";
import Profile from "../components/Profile";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Navigate to="/article" replace />} />,
    <Route path="/signin" element={<SignIn />} />,
    <Route path="/signup" element={<Signup />} />,
    <Route
      path="/article"
      element={
        <>
          <Dashboard />
          <Outlet />
        </>
      }
    >
      <Route
        index={true}
        path="profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
      <Route
        index={true}
        path=":id"
        element={
          <>
            <Modal />
          </>
        }
      />
      ,
    </Route>,
    <Route path="/logout" element={<Logout />} />,
  ])
);

export default router;
