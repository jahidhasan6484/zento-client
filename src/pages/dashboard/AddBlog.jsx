import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { tags } from "../../../localDB";

const AddBlog = () => {
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const handleAddBlog = async (e) => {
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

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64Image = await toBase64(image);

      const data = {
        title,
        content,
        image: base64Image,
        tag,
      };

      setCustomLoading(true);

      const token = localStorage.getItem("token");

      const blogData = await axios.post(
        `${import.meta.env.VITE_server}/api/blog/add`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(blogData?.data?.message);

      // Reset the form
      e.target.reset();
    } catch (error) {
      console.log(error);
      setCustomError("An error occurred while adding the blog");
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF4F5] min-h-screen lg:py-24 md:p-12">
      <div className="card shrink-0 lg:w-2/5 mx-auto shadow-2xl bg-base-100">
        <form onSubmit={handleAddBlog} className="card-body -tracking-wider">
          <h1 className="text-2xl my-4 lowercase">Add New Blog</h1>
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
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tag</span>
            </label>
            <select
              name="tag"
              className="select select-bordered w-full max-w-xs"
              defaultValue="" // Set default value here
              required
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
              className="file-input w-full max-w-xs "
              required
            />
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
              {customLoading ? "Loading" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
