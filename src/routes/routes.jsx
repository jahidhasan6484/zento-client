import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/warnings/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import AddBlog from "../pages/dashboard/AddBlog";
import MyBlog from "../pages/dashboard/MyBlog";
import Details from "../pages/dashboard/Details";
import UpdateBlog from "../pages/dashboard/UpdateBlog";
import TrendingTopics from "../pages/TrendingTopics";
import Chart from "../pages/dashboard/Chart";
import DetailsForUser from "../components/DetailsForUser";
import ProfileUpdate from "../pages/ProfileUpdate";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About";

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
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/trending-topic",
        element: <TrendingTopics />,
      },
      {
        path: "/trending-topic/details/:id",
        element: <DetailsForUser />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/update",
        element: (
          <PrivateRoute>
            <ProfileUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
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
