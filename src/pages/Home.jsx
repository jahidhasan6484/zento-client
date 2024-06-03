import Hero from "../components/Hero";
import Community from "./Community";
import TrendingTopics from "./TrendingTopics";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF4F5]">
      <Hero />
      <TrendingTopics />
      <Community />
    </div>
  );
};

export default Home;
