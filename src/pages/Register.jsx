/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthState,
  // useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import axios from "axios";
import GoogleLogin from "../auth/GoogleLogin";

const Register = () => {
  const navigate = useNavigate();

  const [customError, setCustomError] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  const userInfo = useAuthState(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setCustomError("Password should be at least 6 character long");
      return;
    } else {
      setCustomError("");
    }

    const data = {
      name,
      email,
      password,
    };

    const userData = await createUserWithEmailAndPassword(email, password);

    if (userData) {
      setCustomLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_server}/api/user/register`,
          data
        );

        const { token, message } = response.data;

        toast.success(message);
        localStorage.setItem("token", token);
      } catch {
        await signOut();
        toast.error("Something went wrong!");
      } finally {
        setCustomLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userInfo[0]) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-2xl my-4">Register</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="your name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password (minimum length 6) </span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <h1 className="label-text-alt text-red-600 font-semibold">
                {customError
                  ? `${customError} `
                  : error
                  ? `${error?.message}`
                  : null}
              </h1>
            </label>
          </div>

          <label className="label flex justify-end">
            <h1 className="label-text-alt">
              Already with Zento? <Link to="/login">Login Here</Link>
            </h1>
          </label>

          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              disabled={loading || customLoading}
            >
              {loading || customLoading ? "Loading" : "Register"}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center label-text-alt mt-2">
            <p>Or use social option</p>
          </div>

          <div className="mt-2 form-control flex flex-row justify-center gap-x-4">
            <GoogleLogin />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
