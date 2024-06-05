import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import BarChart from "./BarChart";
import Loading from "../warnings/Loading";
import SectionTitle from "../../components/SectionTitle";

const Chart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getBlogCount = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_server}/api/blog/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.data);
    } catch (error) {
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogCount();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FFF4F5] min-h-screen py-12 lg:py-24 flex justify-center lg:items-center">
      <div className="w-full lg:w-2/3 mx-auto">
        <SectionTitle text="number of blogs" />
        <BarChart data={data} />
      </div>
    </div>
  );
};

export default Chart;
