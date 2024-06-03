/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { useSignOut } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoTimerOutline } from "react-icons/io5";

const Card = ({ blog, loadData }) => {
  const { _id, title, content, image, tag, author, createdAt } = blog;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signOut] = useSignOut(auth);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_server}/api/blog/delete?blogId=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadData();
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="group relative card w-96 h-124 bg-base-100 shadow-xl overflow-hidden transition-transform duration-300 transform hover:brightness-75">
      <figure className="h-1/2">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body h-1/2 flex flex-col gap-6 p-0 mt-4">
        <div
          className={`bg-gradient-to-r ${
            tag === "Travel" ? "from-[#F976D0]" : "from-[#4EC1D8]"
          } to-transparent w-2/3`}
        >
          <p className="py-2 px-4 text-white -tracking-wider">{tag}</p>
        </div>

        <div className="text-center flex flex-col gap-4 px-6">
          <h2 className="text-2xl font-bold -tracking-wide">
            {title && title.length > 45 ? `${title.slice(0, 44)}...` : title}
          </h2>
          <p className="-tracking-wider">
            {content && content.length > 151
              ? `${content.slice(0, 150)}...`
              : content}
          </p>
        </div>
        <div className="flex justify-between -tracking-wider text-sm px-6">
          <p className="flex items-center justify-start gap-1">
            <IoPersonCircleOutline />
            {author?.name}
          </p>
          <p className="flex items-center justify-end gap-1">
            <IoTimerOutline />
            {formatDate(createdAt)}
          </p>
        </div>
      </div>

      {/* actions */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-2">
          <Link
            to={`details/${_id}`}
            className="btn btn-sm btn-circle bg-white text-[#FF6481] focus:outline-none"
          >
            <LuEye size={16} />
          </Link>
          <Link
            to={`update/${_id}`}
            className="btn btn-sm btn-circle bg-white text-yellow-500 focus:outline-none"
          >
            <MdModeEdit size={16} />
          </Link>
          <button
            disabled={loading}
            onClick={handleDelete}
            className="btn btn-sm btn-circle bg-white text-red-600 focus:outline-none"
          >
            <MdDelete size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
