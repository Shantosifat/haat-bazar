import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";


const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = UseAxios();

  const {
    data={},
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !authLoading && !!user?.email, // only run if email exists
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role?email=${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
  });

  return {
    role: (data.role || "user").toLowerCase(),   // ← always lower‑case
    previousRole: data.previous_role || null,
    roleLoading: authLoading || roleLoading,
    refetch,
  };
};

export default useUserRole;

// hooks/useUserRole.js
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import UseAuth from "./UseAuth";

// const axiosPublic = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// });

// const useUserRole = () => {
//   const { user, loading: authLoading } = UseAuth();

//   const {
//     data = {},           // will hold { role: "vendor", previous_role: … }
//     isLoading: roleLoading,
//   } = useQuery({
//     queryKey: ["user-role", user?.email],
//     enabled: !authLoading && !!user?.email,
//     queryFn: async () => {
//       const res = await axiosPublic.get(
//         `/users/role?email=${encodeURIComponent(user.email)}`
//       );
//       return res.data;
//     },
//     staleTime: 60_000,
//   });

//   return {
//     role: (data.role || "user").trim().toLowerCase(),
//     roleLoading: authLoading || roleLoading,
//   };
// };

// export default useUserRole;
