import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

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


