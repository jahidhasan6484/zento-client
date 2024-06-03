const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(./banner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there 👋</h1>
          <p className="mb-5 -tracking-wider">
            Welcome to our portal, welcome to the biggest blog portal.
            Let&apos;s explore together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
