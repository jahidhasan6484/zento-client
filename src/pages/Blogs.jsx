import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./warnings/Loading";
import CardForUser from "../components/CardForUser";
import SectionTitle from "../components/SectionTitle";

const Blogs = () => {
  const [loading, setLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_server}/api/blog/all`
      );

      setAllBlogs(response.data.data.reverse()); // Reverse the array
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Pagination
  const blogsPerPage = 6;
  const totalBlogs = allBlogs.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FFF4F5] min-h-screen flex flex-col py-12">
      <SectionTitle text="Latest blogs" />
      <div className="grid grid-cols-1 md:w-2/3 mx-auto lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {currentBlogs.map((blog, index) => (
          <CardForUser key={index} blog={blog} />
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

export default Blogs;
