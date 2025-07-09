import signupAnimation from "../../assets/register/Animation - 1749909840681.json";
import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {
  
   

  
  return (
    <div className="min-h-screen flex items-center rounded-xl justify-center bg-gradient-to-tr from-rose-200 via-sky-100 to-indigo-200 p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Animation */}
        <div className="bg-indigo-50 flex flex-col items-center justify-center p-8">
          <Lottie
            autoplay
            loop={true}
            animationData={signupAnimation}
            style={{ height: "350px", width: "350px" }}
          />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4">
            Join Libree Today
          </h2>
          <p className="text-sm text-indigo-500 mt-2 text-center">
            Organize your digital bookshelf <br /> anytime, anywhere.
          </p>
        </div>

        {/* Right: Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form
        //    onSubmit={handleSignUp} 
          className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>
            {/* image */}
            <div>
              <label className="block mb-1 text-gray-600">Image</label>
              <input
                type="text"
                name="photo"
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            <div className="text-red-700">
              <p>
              
                Password must have  at least one uppercase,
                one lowercase letter & minimum length of 6 characters
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Create Account
            </button>
            <button
            //   onClick={handleGoogleSignUp}
              className="btn btn-secondary btn-outline rounded-xl w-full my-1"
            >
              <FaGoogle size={18}></FaGoogle> SignUp with Google
            </button>
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
      </div>
    </div>
  );
};

export default SignUp;
