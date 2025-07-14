import React from "react";
import { Navigate } from "react-router";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/UseUSerRole";
import Loading from "../pages/Shared/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = useUserRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user || role !== "admin") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }
  return children;
};

export default AdminRoute;
