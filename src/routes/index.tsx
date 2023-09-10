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
import UpdatePassword from "../components/UpdatePassword";
import NotFound from "../components/NotFound";

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
        path=":id"
        element={
          <>
            <Modal />
          </>
        }
      />
      ,
      <Route
        index={true}
        path="update-password"
        element={
          <>
            <UpdatePassword />
          </>
        }
      />
      ,
    </Route>,
    <Route
      path="/profile"
      element={
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      }
    />,
    <Route path="/logout" element={<Logout />} />,
    <Route path="*" element={<NotFound />} />,
  ])
);

export default router;
