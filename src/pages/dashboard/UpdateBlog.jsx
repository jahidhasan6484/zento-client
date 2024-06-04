/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { tags } from "../../../localDB";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../warnings/Loading";

const UpdateBlog = () => {
  const { id } = useParams();

  const [customLoading, setCustomLoading] = useState(true);
  const [customError, setCustomError] = useState("");
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

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const image = e.target.image.files[0];
    const tag = e.target.tag.value;

    if (content.length < 50) {
      setCustomError("Content should be at least 50 characters long");
      return;
    } else {
      setCustomError("");
    }

    const data = {};

    if (title && title !== blog.title) {
      data.title = title;
    }
    if (content && content !== blog.content) {
      data.content = content;
    }
    if (tag && tag !== blog.tag) {
      data.tag = tag;
    }

    if (image) {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      try {
        data.image = await toBase64(image);
      } catch (error) {
        setCustomError("An error occurred while converting the image");
        return;
      }
    }

    if (Object.keys(data).length === 0) {
      setCustomError("There is no changes in your blog information");
      return;
    }

    try {
      setCustomLoading(true);

      const token = localStorage.getItem("token");

      await axios.patch(
        `${import.meta.env.VITE_server}/api/blog/update?id=${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog updated successfully");
      e.target.reset();
      setBlog({});
    } catch (error) {
      setCustomError("An error occurred while updating the blog");
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF4F5] min-h-screen lg:py-24 md:p-12">
      <div className="card shrink-0 lg:w-2/5 mx-auto shadow-2xl bg-base-100">
        <form onSubmit={handleUpdateBlog} className="card-body -tracking-wider">
          <h1 className="text-2xl my-4 lowercase">Update Blog</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Blog title"
              name="title"
              className="input input-bordered"
              required
              defaultValue={blog.title}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              placeholder="Blog content"
              name="content"
              className="textarea textarea-bordered"
              required
              defaultValue={blog.content}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tag</span>
            </label>
            <select
              name="tag"
              className="select select-bordered w-full max-w-xs"
              required
              defaultValue={blog.tag}
            >
              <option value="" disabled>
                Select a tag
              </option>
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cover Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
            />
            {blog.image && (
              <div className="mt-2">
                <span className="label-text">Current Image:</span>
                <img
                  src={blog.image}
                  alt="Current blog cover"
                  className="mt-2 rounded-md max-h-48"
                />
              </div>
            )}
            <label className="label">
              <h1 className="label-text-alt text-red-600 font-semibold">
                {customError}
              </h1>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              className="btn bg-[#FF6481] text-white"
              disabled={customLoading}
            >
              {customLoading ? "Loading" : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
