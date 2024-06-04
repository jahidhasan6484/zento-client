import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loading from "./warnings/Loading";
import CardForTopic from "../components/CardForTopic";

const ShowTopic = () => {
  const { key } = useParams();
  const [customLoading, setCustomLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6); // Number of blogs per page

  const fetchData = async () => {
    setCustomLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_server}/api/blog/key?key=${key}`
      );

      setBlogs(response.data.data);
    } catch (error) {
      toast.error("Failed to get details!");
    } finally {
      setCustomLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalBlogs = blogs.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (customLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FFF4F5] min-h-screen flex flex-col py-12">
      <h1 className="text-center text-2xl py-12 font-bold">{key}</h1>

      {!customLoading && currentBlogs.length < 1 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-center text-black -tracking-wider">
            No blogs available for this topic yet.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:w-2/3 mx-auto lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {currentBlogs.map((blog, index) => (
          <CardForTopic key={index} blog={blog} />
        ))}
      </div>
      {totalBlogs > blogsPerPage && (
        <div className="flex justify-center items-center -tracking-wider my-6 gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="btn btn-sm text-sm bg-[#FF6481] text-white"
            >
              Previous
            </button>
          )}
          <p>
            Page {currentPage} of {totalPages}
          </p>
          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="btn btn-sm text-sm bg-[#FF6481] text-white"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowTopic;
