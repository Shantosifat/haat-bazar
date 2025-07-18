import React from "react";
import useUserRole from "../../hooks/UseUSerRole";
import Loading from "../../pages/Shared/Loading";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import VendorDashboard from "./VendorDashboard";
import Forbidden from "../../pages/Forbidden/Forbidden";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "vendor") {
    return <VendorDashboard></VendorDashboard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
