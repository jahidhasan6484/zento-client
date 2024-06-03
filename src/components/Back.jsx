import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleGoBack}
      className="btn btn-sm text-sm my-4 lowercase"
    >
      back
    </button>
  );
};

export default Back;
