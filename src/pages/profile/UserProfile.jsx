import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import dayjs from "dayjs";
import Loading from "../warnings/Loading";
import { auth } from "../../firebase/firebase.config";

const UserProfile = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

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
        if (err.response?.data?.message === "Token has expired") {
          await signOut();
          navigate("/login", { replace: true });
          toast.error("Session expired!");
        } else {
          toast.error(err?.response?.data?.message || "An error occurred");
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

  if (!userDetails) {
    return (
      <div className="h-screen bg-[#FFF4F5] flex justify-center items-center">
        <p className="text-xl">No user details found</p>
      </div>
    );
  }

  const {
    name,
    dateOfBirth,
    email,
    address,
    gender,
    maritalStatus,
    contactNumber,
    image,
  } = userDetails;

  const calculateAge = (dob) => {
    const birthDate = dayjs(dob);
    const today = dayjs();
    return today.diff(birthDate, "year");
  };

  const age = dateOfBirth ? calculateAge(dateOfBirth) : null;

  const userInfo = `${
    email
      ? `I know your email address, that is ${email}.`
      : "You can share your email address with me, I would not mind."
  }
    ${
      address
        ? `Your home address is ${address}.`
        : "But I don't know your home address."
    }
    ${
      age && gender
        ? `I know you are ${age} years old ${gender}.`
        : age
        ? `I know you are ${age} years old.`
        : gender
        ? `I know you are ${gender}.`
        : "You can share your age and gender with me."
    }
    ${
      maritalStatus
        ? `Your marital status is ${maritalStatus}. Am I right?`
        : "Are you married or single? I would not tell anyone."
    }
    ${
      contactNumber
        ? `Are you available on ${contactNumber}?`
        : "You can share your contact number with me."
    }`;

  return (
    <div className="h-screen bg-[#FFF4F5] flex flex-col lg:flex-row items-center lg:px-48 py-6 px-12 gap-6">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-4">
        <div>
          {image ? (
            <img src={image} alt={name} className="w-48 rounded-full" />
          ) : user?.photoURL ? (
            <img
              src={user?.photoURL}
              alt={name}
              className="w-48 rounded-full"
            />
          ) : (
            <GoPerson size={98} />
          )}
        </div>
      </div>

      <div className="w-full text-center lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-xl lg:text-3xl font-bold">Hey {name}👋,</h1>
        <p className="-tracking-wider">{userInfo}</p>
      </div>
    </div>
  );
};

export default UserProfile;
