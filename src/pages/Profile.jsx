import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./warnings/Loading";
import toast from "react-hot-toast";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <h1>Profile of {userDetails?.name}</h1>
    </div>
  );
};

export default Profile;
