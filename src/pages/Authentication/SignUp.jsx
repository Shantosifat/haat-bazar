import signupAnimation from "../../assets/register/Animation - 1749909840681.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { useState } from "react";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import UseAxios from "../../hooks/UseAxios";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = UseAuth();
  const axiosInstance = UseAxios();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log("User created:", result.user);

        Swal.fire({
          icon: "success",
          title: "Sign Up Successful!",
          text: "Welcome to Kachabazaar!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Construct user data for database
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
          name: data.name,
          photoURL: data.photo, // ✅ using form input directly
        };

        // Save user to backend
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log("Saved to DB:", userRes.data);

        // Update Firebase profile
        const userProfile = {
          displayName: data.name,
          photoURL: data.photo,
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("Firebase profile updated");
            navigate(from);
          })
          .catch((error) => {
            console.error("Firebase profile update failed:", error);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center rounded-xl justify-center bg-gradient-to-tr from-rose-200 via-sky-100 to-indigo-200 p-4">
      <div className="w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-gray-600">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-1 text-gray-600">Photo URL</label>
              <input
                type="text"
                {...register("photo")}
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
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
                {...register("password", { required: true, minLength: 6 })}
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600 mt-2">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 mt-2">
                  Password must be 6 characters or longer
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Create Account
            </button>

            {/* Social Login */}
            <SocialLogin />
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Right: Lottie Animation */}
        <div className="flex flex-col items-center justify-center p-8">
          <Lottie
            autoplay
            loop={true}
            animationData={signupAnimation}
            style={{ height: "350px", width: "350px" }}
          />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4">
            Join Libree Today
          </h2>
          <p className="text-green-600 font-semibold mt-2 text-center">
            Know your বাজারদর instantly. <br /> Shop smarter, live better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
