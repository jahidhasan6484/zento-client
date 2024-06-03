import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src="./logo.png" alt="logo" className="w-24"></img>
    </Link>
  );
};

export default Logo;
