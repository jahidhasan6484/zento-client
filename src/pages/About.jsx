import SectionTitle from "../components/SectionTitle";

/* eslint-disable react/no-unescaped-entities */
const About = () => {
  return (
    <div className="bg-[#FFF4F5] min-h-screen flex flex-col py-12">
      <SectionTitle text="welcome to Zento" />
      <div className="w-full md:w-2/3 lg:w-1/3 mx-auto -tracking-wider flex flex-col gap-4">
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            - Zento is not just another blog web portal; it's your digital
            destination for inspiration, knowledge, and connection.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-white text-[#FF6481]">
            - Our platform is built on the belief that everyone has a story to
            share and that there's value in diversity of voices and
            perspectives.
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            - We strive to curate an enriching and engaging experience for our
            users, fostering a sense of belonging and camaraderie.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-white text-[#FF6481]">
            - Our commitment to quality content is unwavering. We work with
            talented writers and contributors to bring you thought-provoking
            articles, insightful guides, and entertaining stories.
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            - Join us on this journey of exploration and discovery. Welcome to
            Zento - where stories come to life and connections are made.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-white text-[#FF6481]">
            - We are dedicated to fostering a community where everyone's voice
            is heard and valued, creating an inclusive space for meaningful
            discussions and interactions.
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            - Our goal is to empower individuals to share their unique
            perspectives, learn from one another, and inspire positive change in
            the world.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
