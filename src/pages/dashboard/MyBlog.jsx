import toast from "react-hot-toast";
import Loading from "../warnings/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";

const MyBlog = () => {
  const navigate = useNavigate();

  const [myBlogs, setMyBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  const [signOut] = useSignOut(auth);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_server}/api/blog/my-blogs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyBlogs(response.data.data);
      } catch (err) {
        if (err.response.data.message === "Token has expired") {
          await signOut();
          navigate("/login", { replace: true });
          toast.error("Session expired!");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log("myBlogs", myBlogs);
  return <div>MyBlog</div>;
};

export default MyBlog;
