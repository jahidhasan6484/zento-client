import Hero from "../components/Hero";
import About from "./About";
import Blogs from "./Blogs";
import Community from "./Community";
import Sponsors from "./Sponsors";
import TrendingTopics from "./TrendingTopics";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF4F5]">
      <Hero />
      <TrendingTopics />
      <Blogs />
      <About />
      <Community />
      <Sponsors />
    </div>
  );
};

export default Home;
