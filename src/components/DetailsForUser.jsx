import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { MdUpdate } from "react-icons/md";
import { CiPen } from "react-icons/ci";
import Loading from "../pages/warnings/Loading";

const DetailsForUser = () => {
  const { id } = useParams();
  const [customLoading, setCustomLoading] = useState(false);
  const [blog, setBlog] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_server}/api/blog/one?id=${id}`
      );

      setBlog(response.data.data);
    } catch (error) {
      toast.error("Failed to get details!");
    } finally {
      setCustomLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (customLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FFF4F5] min-h-screen lg:py-24 md:p-12">
      <div className="w-full lg:w-2/4 mx-auto bg-white p-12 flex flex-col gap-12 rounded-lg">
        <div className="w-full px-4 flex flex-col gap-8">
          <h1 className="text-xl lg:text-3xl font-bold text-center">
            {blog?.title}
          </h1>
          <div className="-tracking-wider">
            <p className="flex items-center justify-center gap-1">
              <CiCalendarDate color="#FF7D95" />{" "}
              <span className="font-bold">Published: </span> June 03, 2024
            </p>
            <p className="flex items-center justify-center gap-1">
              <MdUpdate color="#FF7D95" />{" "}
              <span className="font-bold">Update: </span>June 03, 2024
            </p>
            <p className="flex items-center justify-center gap-1">
              <CiPen color="#FF7D95" />{" "}
              <span className="font-bold">Author: </span>Jahid Hasan Juyel
            </p>
          </div>
        </div>
        <div className="w-full">
          <img src={blog.image} alt={blog.title}></img>
        </div>
        <div className="-tracking-wider">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsForUser;
