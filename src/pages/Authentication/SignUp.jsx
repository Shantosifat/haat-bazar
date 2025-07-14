import signupAnimation from "../../assets/register/Animation - 1749909840681.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { useState } from "react";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import UseAxios from "../../hooks/UseAxios";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = UseAxios();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        Swal.fire({
          icon: "success",
          title: "Sign Up Successful!",
          text: "Welcome to Kachabazaar!",
          timer: 2000,
          showConfirmButton: false,
        });
       
        // update user profile in db

        const userInfo = {
          email: data.email,
          role: "user", // deafult role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log("updated user info", userRes.data);
        // update userprofile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("profile pic & name updated ");
            navigate(from)
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center rounded-xl justify-center bg-gradient-to-tr from-rose-200 via-sky-100 to-indigo-200 p-4">
      <div className="w-full max-w-5xl  shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>
            {/* image */}
            <div>
              <label className="block mb-1 text-gray-600">Image</label>
              <input
                type="text"
                name="photo"
                {...register("photo")}
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
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
                name="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
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

            {/* <div className="text-red-700">
              <p>
                Password must have at least one uppercase, one lowercase letter
                & minimum length of 6 characters
              </p>
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Create Account
            </button>
            <SocialLogin></SocialLogin>
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
        {/* Right: Animation */}
        <div className=" flex flex-col items-center justify-center p-8">
          <Lottie
            autoplay
            loop={true}
            animationData={signupAnimation}
            style={{ height: "350px", width: "350px" }}
          />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4">
            Join Libree Today
          </h2>
          <p className=" text-green-600 font-semibold mt-2 text-center">
            Know your বাজারদর instantly. <br /> Shop smarter, live better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
