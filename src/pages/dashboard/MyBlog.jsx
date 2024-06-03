import toast from "react-hot-toast";
import Loading from "../warnings/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import Card from "../../components/Card";

const MyBlog = () => {
  const navigate = useNavigate();

  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [signOut] = useSignOut(auth);

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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FFF4F5] min-h-screen lg:py-24 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {myBlogs?.map((blog, index) => {
          return <Card key={index} blog={blog} loadData={fetchUserDetails} />;
        })}
      </div>

      {!loading && myBlogs.length < 1 && (
        <div className="h-screen flex flex-col justify-center items-center gap-4">
          <h1 className="text-red-600 text-xl -tracking-widest">
            OOPS! There are no blogs available at the moment!
          </h1>
          <Link to="/dashboard/add-blog" className="underline text-green-500">
            Start writing
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBlog;
