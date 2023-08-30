import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  return (
    <div className={`min-h-screen w-full mx-auto bg-[#0D1117] text-white`}>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;