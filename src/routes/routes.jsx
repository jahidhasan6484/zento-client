import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/warnings/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AddBlog from "../pages/dashboard/AddBlog";
import MyBlog from "../pages/dashboard/MyBlog";
import Details from "../pages/dashboard/Details";
import UpdateBlog from "../pages/dashboard/UpdateBlog";
import Chart from "../pages/dashboard/Chart";
import DetailsForUser from "../components/DetailsForUser";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About";
import ProfileLayout from "../layouts/ProfileLayout";
import ChangePassword from "../pages/profile/ChangePassword";
import ProfileUpdate from "../pages/profile/ProfileUpdate";
import UserProfile from "../pages/profile/UserProfile";
import Blogs from "../pages/Blogs";
import ShowTopic from "../pages/ShowTopic";

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
        path: "/latest-blogs",
        element: <Blogs />,
      },
      {
        path: "/latest-blogs/detais/:id",
        element: <Blogs />,
      },
      {
        path: "/latest-blogs/details/:id",
        element: <DetailsForUser />,
      },
      {
        path: "/search/details/:id",
        element: <DetailsForUser />,
      },
      {
        path: "/trending-topic/:key",
        element: <ShowTopic />,
      },
      {
        path: "/trending-topic/:key/details/:id",
        element: <DetailsForUser />,
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
  {
    path: "profile",
    element: (
      <PrivateRoute>
        <ProfileLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="me" />,
      },
      {
        path: "me",
        element: <UserProfile />,
      },
      {
        path: "update",
        element: <ProfileUpdate />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);
