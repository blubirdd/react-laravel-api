import React, { useState, useEffect } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Notification from './Notification.jsx';

function DefaultLayout() {

  const {notification} = useStateContext();

  return (
    <>
      <Navbar />
      <Sidebar />

      <main>
        <div className="w-full pt-4 px-4 sm:px-6 md:px-8 lg:ps-72">
          <Outlet />
        </div>
      </main>

      {notification &&
        <Notification message={notification} />
      }

    </>
  )
}

export default DefaultLayout