import { useUpdatePassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import { useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [customError, setCustomError] = useState("");
  const [updatePassword, updating, error] = useUpdatePassword(auth);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password.length < 6) {
      setCustomError("Password should be 6 character long");
      return;
    }

    if (password !== confirmPassword) {
      setCustomError("Both password are not match");
      return;
    }

    const success = await updatePassword(password);
    if (success) {
      toast.success("Updated password");
    } else {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="bg-[#FFF4F5] min-h-screen flex justify-center items-center lg:py-24 md:p-12">
      <div className="card shrink-0 lg:w-2/5 mx-auto shadow-2xl bg-base-100">
        <form
          onSubmit={handleUpdateProfile}
          className="card-body -tracking-wider"
        >
          <h1 className="text-2xl my-4 lowercase">change password</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="new password"
              name="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              className="input input-bordered"
              required
            />
            <label className="label">
              <h1 className="label-text-alt text-red-600 font-semibold">
                {customError || error?.message}
              </h1>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#FF6481] text-white" disabled={updating}>
              {updating ? "Updating" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
