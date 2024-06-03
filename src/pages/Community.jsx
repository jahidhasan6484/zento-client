import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="py-12 border flex flex-col md:flex-row px-12 text-center justify-around items-center bg-white">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Join our community 👋</h1>
        <p className="-tracking-wider">
          Unlock the barrier, explore the biggest blog portal and contribute on
          that
        </p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="-tracking-wider">
          Register to our web portal, cancel at anytime.
        </p>
        <Link
          to="/register"
          className="w-24 btn bg-[#FF6481] text-white text-sm"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Community;
