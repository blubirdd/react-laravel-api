import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import AdminLayout from "../layouts/AdminLayout";
import Loading from "../others/Loading";

function PrivateRoute({ adminOnly }) {
  const { user, isLoading } = useStateContext();

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    )
  }

  console.log(user.name);

  if (adminOnly && user.role !== "admin") {
    console.log("redirect to /home");
    return <Navigate to="/home" />;
  }

  return <AdminLayout />;
}

export default PrivateRoute;
