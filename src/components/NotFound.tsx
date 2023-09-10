import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center  items-center h-screen flex">
      <div className="w-full">
        <p className="font-semibold text-2xl">404 | Page Not Found.</p>
        <Link
          className="font-semibold text-purple-400 outline-none hover:text-purple-500"
          to={"/"}
        >
          Go back to Home Page
        </Link>
      </div>
    </div>
  );
}
