/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import Loading from "../warnings/Loading";
import Logo from "./Logo";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [showSearch, setShowSearch] = useState(false); // State to control the visibility of the search input
  const [result, setResult] = useState([]); // State to store search results
  const [allBlogs, setAllBlogs] = useState([]); // State to store all blogs
  const [loadingData, setLoadingData] = useState(false); // State to control loading data state

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axios.get(
        `${import.meta.env.VITE_server}/api/blog/all`
      );

      setAllBlogs(response.data.data.reverse()); // Reverse the array
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return <Loading />;
  }

  const handleLogOut = async () => {
    const success = await signOut();
    if (success) {
      navigate("/", { replace: true });
    }
  };

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (searchQuery) => {
    const filteredResults = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResult(filteredResults);
  };

  const SearchResultItem = ({ title, _id }) => {
    return (
      <div>
        <Link
          to={`/search/details/${_id}`}
          className="-tracking-wider p-2 hover:bg-[#FF6481] hover:text-white hover:rounded-lg text-sm"
        >
          {title}
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="navbar bg-base-100 flex justify-between items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 gap-2"
            >
              <li>
                <Link to="about">About</Link>
              </li>
              <li>
                <Link to="latest-blogs">Latest Blogs</Link>
              </li>

              {user && (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                </>
              )}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm text-sm text-red-600"
                >
                  Logout
                </button>
              ) : (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Logo />
        </div>
        <div className="navbar-end flex items-center relative">
          {showSearch && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border rounded shadow-lg">
              <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
                placeholder="Search"
                name="search"
              />
              {result.length > 0 && (
                <div className="flex flex-col gap-4 py-4">
                  {result.map((item, index) => (
                    <SearchResultItem key={index} {...item} />
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSearchIconClick}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
