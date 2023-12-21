import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

function GuestLayout() {
  const { token, userRole } = useStateContext();

  if (token) {
    if (userRole === 'user') {
      return <Navigate to="/home" />;
    }
    else {
      return <Navigate to="/admin" />;
    }

  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default GuestLayout