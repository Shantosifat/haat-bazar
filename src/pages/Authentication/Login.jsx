import loginAnimation from "../../assets/login/Animation - 1749911072868.json";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { login } = UseAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    login(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back!`,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center rounded-xl justify-center bg-gradient-to-tr from-indigo-100 via-sky-50 to-rose-50 p-4">
      <div className="w-full max-w-4xl  shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Login form */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full text-black border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600 mt-2">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Enter your password"
                className="w-full text-black border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-600 mt-2">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 mt-2">
                  Password must be 6 character or longer
                </p>
              )}
            </div>
            <div className="text-red-700">
              <p>
                Password must have at least one uppercase, one lowercase letter
                & minimum length of 6 characters
              </p>
            </div>
            <div>
              <a className="link link-hover text-black">Forgot password?</a>
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Log In
            </button>
            <SocialLogin></SocialLogin>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Right: Animation or illustration */}
        <div className=" flex flex-col items-center justify-center p-8">
          <Lottie
            autoplay
            loop={true}
            animationData={loginAnimation}
            style={{ height: "350px", width: "350px" }}
          />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4">
            Welcome Back!
          </h2>
          <p className="text-sm font-semibold text-indigo-500 mt-2 text-center">
            Log in to continue to কাঁচাবাজার and manage your virtual
            Marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
