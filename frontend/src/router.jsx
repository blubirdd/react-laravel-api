import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/forms/UserForm";
import Posts from "./pages/Posts";
import PostForm from "./pages/forms/PostForm";
import Home from './pages/Home';

import AdminLayout from "./components/layouts/AdminLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import UserLayout from './components/layouts/UserLayout';
import PrivateRoute from './components/Admin/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/admin',
    // element: <AdminLayout />,
    element: <PrivateRoute  element={<AdminLayout />} adminOnly={true} />,
    children: [
      { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'users/new', element: <UserForm key="userCreate" /> },
      { path: 'users/:id', element: <UserForm key="userUpdate" /> },
      { path: 'posts', element: <Posts /> },
      { path: 'posts/new', element: <PostForm key="postCreate" /> },
      { path: 'posts/:id', element: <PostForm key="postUpdate" /> },
    ],
  },
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: 'home', element: <Home /> },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
