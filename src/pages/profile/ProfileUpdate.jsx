import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import Loading from "../warnings/Loading";

const ProfileUpdate = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const [signOut] = useSignOut(auth);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_server}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserDetails(response.data.data);
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
  }, [signOut, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const address = e.target.address.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const gender = e.target.gender.value;
    const maritalStatus = e.target.maritalStatus.value;
    const contactNumber = e.target.contactNumber.value;
    const image = e.target.image.files[0];

    const data = {};

    if (name && name !== userDetails.name) {
      data.name = name;
    }
    if (address && address !== userDetails.address) {
      data.address = address;
    }
    if (dateOfBirth && dateOfBirth !== userDetails.dateOfBirth) {
      data.dateOfBirth = dateOfBirth;
    }
    if (gender && gender !== userDetails.gender) {
      data.gender = gender;
    }
    if (maritalStatus && maritalStatus !== userDetails.maritalStatus) {
      data.maritalStatus = maritalStatus;
    }
    if (contactNumber && contactNumber !== userDetails.contactNumber) {
      data.contactNumber = contactNumber;
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
      setCustomError("There is no changes in your information");
      return;
    }

    try {
      setCustomLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${import.meta.env.VITE_server}/api/user/update`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setUserDetails(response.data.data);
    } catch (err) {
      setCustomError("An error occurred while updating the profile");
    } finally {
      setCustomLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FFF4F5] min-h-screen lg:py-24 md:p-12">
      <div className="card shrink-0 lg:w-2/5 mx-auto shadow-2xl bg-base-100">
        <form
          onSubmit={handleUpdateProfile}
          className="card-body -tracking-wider"
        >
          <h1 className="text-2xl my-4 lowercase">Update Profile</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered"
              required
              defaultValue={userDetails?.name}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered"
              required
              defaultValue={userDetails?.email}
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="input input-bordered"
              defaultValue={userDetails?.address}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className="input input-bordered"
              defaultValue={userDetails?.dateOfBirth?.split("T")[0]}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              name="gender"
              className="select select-bordered w-full max-w-xs"
              defaultValue={userDetails?.gender}
            >
              <option value="" disabled>
                Select a gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Marital Status</span>
            </label>
            <select
              name="maritalStatus"
              className="select select-bordered w-full max-w-xs"
              defaultValue={userDetails?.maritalStatus}
            >
              <option value="" disabled>
                Select a status
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <input
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              className="input input-bordered"
              defaultValue={userDetails?.contactNumber}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
            />
            {userDetails?.image && (
              <div className="mt-2">
                <span className="label-text">Current Image:</span>
                <img
                  src={userDetails.image}
                  alt="Current profile"
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
              {customLoading ? "Updating" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
