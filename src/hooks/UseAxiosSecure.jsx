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
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("inside res interceptor", error);
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logout()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }
    }
  );
  return axiosSecure;
};

export default UseAxiosSecure;
