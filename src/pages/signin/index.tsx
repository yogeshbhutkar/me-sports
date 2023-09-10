import Navbar from "../../components/Navbar";
import SigninForm from "./SigninForm";

export default function SignIn() {
  return (
    <div className="relative z-0 ">
      <div className="absolute z-10 w-full">
        <Navbar />
      </div>
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full px-6 py-8 bg-black border border-1 border-gray-700 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Sign in
          </h1>
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
