import axios from "axios";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `https://haatbazaar-server.vercel.app`,
});

const UseAxiosSecure = () => {
  const { user, logout } = UseAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      console.log("inside res interceptor", error);

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logout()
          .then(() => navigate("/login"))
          .catch(() => {});
      }

      return Promise.reject(error); // ✅ send error back to caller
    }
  );

  return axiosSecure;
};

export default UseAxiosSecure;
