const Community = () => {
  return (
    <div className="py-12 border flex flex-col gap-6 md:flex-row px-12 text-center justify-around items-center bg-white">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl lg:text-4xl font-bold">
          Join our community 👋
        </h1>
        <p className="-tracking-wider">
          Unlock the barrier, explore the biggest blog portal and contribute on
          that
        </p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="h-72 carousel carousel-vertical rounded-box -tracking-wider">
          <div className="carousel-item h-full bg-[#07B7E0] flex justify-center items-center w-72 text-2xl font-bold">
            <h1>Easy Registration</h1>
          </div>
          <div className="carousel-item h-full bg-[#EC97B6] flex justify-center items-center w-72 text-2xl font-bold">
            <h1>Social Login</h1>
          </div>
          <div className="carousel-item h-full bg-[#FFEA4F] flex justify-center items-center w-72 text-2xl font-bold">
            <h1>Access Profile</h1>
          </div>
          <div className="carousel-item h-full text-white bg-[#007EC3] flex justify-center items-center w-72 text-2xl font-bold">
            <h1>Get Dashboard</h1>
          </div>
          <div className="carousel-item h-full bg-[#00B0D9] flex justify-center items-center w-72 text-2xl font-bold">
            <h1>Write Blogs</h1>
          </div>
          <div className="carousel-item h-full bg-[#BAE8DD] flex justify-center items-center w-72 text-2xl font-bold">
            Explore Articles
          </div>
          <div className="carousel-item h-full bg-[#EBEBAB] flex justify-center items-center w-72 text-2xl font-bold">
            Own Statistics
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
