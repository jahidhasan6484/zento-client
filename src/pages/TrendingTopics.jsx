import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./warnings/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

const TrendingTopics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getTotalBlogCount = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_server}/api/blog/totalCount`
      );
      setData(response.data.data);
    } catch (error) {
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalBlogCount();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);

  const getBgColor = (key) => {
    switch (key) {
      case "Education":
        return "bg-blue-300";
      case "Food":
        return "bg-green-300";
      case "Health":
        return "bg-red-300";
      case "Inspiration":
        return "bg-purple-300";
      case "Lifestyle":
        return "bg-yellow-300";
      case "Music":
        return "bg-orange-300";
      case "Technology":
        return "bg-indigo-300";
      case "Travel":
        return "bg-teal-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="bg-[#FFF4F5]">
      <h1 className="text-center text-2xl py-12 font-bold">Trending Topics</h1>

      <div className="w-full lg:w-2/3 mx-auto bg-white overflow-x-auto hide-scrollbar flex gap-8 p-12 rounded-xl">
        {sortedData.map(([key, value]) => (
          <Link
            to={`trending-topic/${key}`}
            key={key}
            className={`flex flex-row items-center gap-10 ${getBgColor(
              key
            )} -tracking-wider px-4 py-2 rounded-xl`}
          >
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl font-bold">{value}</p>
              <p>article</p>
            </div>
            <h1 className="text-md font-semibold">{key}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
