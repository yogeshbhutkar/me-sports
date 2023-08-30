import { VITE_API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { formFields } from "../../types";

const SigninForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<formFields>();

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch(`${VITE_API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      console.log("Sign-in successful");
      console.log(data.auth_token);
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-300 font-semibold mb-2">Email:</label>
        <input
          type="Email"
          id="email"
          {...register("email", { required: true })}
          className="w-full border border-1 border-gray-700 bg-[#141414] rounded-md py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-300 font-normal pt-4 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="w-full border border-1 border-gray-700 bg-[#141414] rounded-md py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <p className="text-gray-400 pt-10">
        New user? Click here to{" "}
        <span
          className="text-blue-500 font-bold hover:cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          signup
        </span>
      </p>
      <button
        type="submit"
        className="w-full bg-white border border-1 border-gray-700 text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
