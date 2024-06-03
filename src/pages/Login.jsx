/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import axios from "axios";
import toast from "react-hot-toast";
import GoogleLogin from "../auth/GoogleLogin";
import FacebookLogin from "../auth/FacebookLogin";

const Login = () => {
  const navigate = useNavigate();

  const [customError, setCustomError] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  const userInfo = useAuthState(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setCustomError("Password should be at least 6 character long");
      return;
    } else {
      setCustomError("");
    }

    const data = {
      email,
      password,
    };

    const userData = await signInWithEmailAndPassword(email, password);

    if (userData) {
      setCustomLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_server}/api/user/login`,
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
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-2xl my-4">Login</h1>

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
              New in Zento? <Link to="/register">Register Here</Link>
            </h1>
          </label>

          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              disabled={customLoading || customLoading}
            >
              {loading || customLoading ? "Loading" : "Login"}
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

export default Login;
