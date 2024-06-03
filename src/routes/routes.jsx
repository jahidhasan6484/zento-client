import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/warnings/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import Chart from "../pages/dashboard/Chart";
import AddBlog from "../pages/dashboard/AddBlog";
import MyBlog from "../pages/dashboard/MyBlog";
import Details from "../pages/dashboard/Details";
import UpdateBlog from "../pages/dashboard/UpdateBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "dashboard",
    element: (
      // <PrivateRoute>
      <DashboardLayout />
      // </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="chart" />,
      },
      {
        path: "chart",
        element: <Chart />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "my-blog",
        element: <MyBlog />,
      },
      {
        path: "my-blog/details/:id",
        element: <Details />,
      },
      {
        path: "my-blog/update/:id",
        element: <UpdateBlog />,
      },
    ],
  },
]);
