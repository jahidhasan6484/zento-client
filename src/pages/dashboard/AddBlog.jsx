import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddBlog = () => {
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const image = e.target.image.files[0];

    if (content.length < 50) {
      setCustomError("Content should be at least 50 characters long");
      return;
    } else {
      setCustomError("");
    }

    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("image", image);

    try {
      setCustomLoading(true);

      const token = localStorage.getItem("token");

      const blogData = await axios.post(
        `${import.meta.env.VITE_server}/api/blog/add`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(blogData?.data?.message);

      // Reset the form
      e.target.reset();
    } catch (error) {
      setCustomError("An error occurred while adding the blog");
      setCustomLoading(false);
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <form onSubmit={handleAddBlog} className="card-body">
          <h1 className="text-2xl my-4">Add New Blog</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="blog title"
              name="title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <input
              type="text"
              placeholder="blog content"
              name="content"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cover Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
              required
            />
            <label className="label">
              <h1 className="label-text-alt text-red-600 font-semibold">
                {customError}
              </h1>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={customLoading}>
              {customLoading ? "Loading" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
