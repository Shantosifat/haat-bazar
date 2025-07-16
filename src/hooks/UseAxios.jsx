import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: `https://haatbazaar-server.vercel.app`,
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
