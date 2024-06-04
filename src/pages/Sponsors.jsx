import SectionTitle from "../components/SectionTitle";

const Sponsors = () => {
  const sponsors = [
    {
      name: "sponsor1",
      image: "./sponsors1.png",
    },
    {
      name: "sponsor2",
      image: "./sponsors2.png",
    },
    {
      name: "sponsor3",
      image: "./sponsors3.png",
    },
    {
      name: "sponsor4",
      image: "./sponsors4.png",
    },
    {
      name: "sponsor5",
      image: "./sponsors5.png",
    },
    {
      name: "sponsor6",
      image: "./sponsors6.png",
    },
    {
      name: "sponsor7",
      image: "./sponsors7.png",
    },
    {
      name: "sponsor8",
      image: "./sponsors8.png",
    },
    {
      name: "sponsor9",
      image: "./sponsors9.png",
    },
  ];

  return (
    <div className="bg-[#FFF4F5] py-12">
      <SectionTitle text="sponsors" />
      <div className="w-2/3 mx-auto">
        <div className="carousel rounded-box">
          {sponsors.map(({ name, image }, index) => {
            return (
              <div key={index} className="carousel-item">
                <img src={image} alt={name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
