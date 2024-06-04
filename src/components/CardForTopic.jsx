/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoPersonCircleOutline, IoTimerOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CardForTopic = ({ blog }) => {
  const { _id, title, content, image, tag, author, createdAt } = blog;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case "Education":
        return "from-blue-500 to-blue-300";
      case "Food":
        return "from-green-500 to-green-300";
      case "Health":
        return "from-red-500 to-red-300";
      case "Inspiration":
        return "from-purple-500 to-purple-300";
      case "Lifestyle":
        return "from-yellow-500 to-yellow-300";
      case "Music":
        return "from-orange-500 to-orange-300";
      case "Technology":
        return "from-indigo-500 to-indigo-300";
      case "Travel":
        return "from-teal-500 to-teal-300";
      default:
        return "from-gray-500 to-gray-300";
    }
  };

  return (
    <div className="group relative card w-96 h-124 bg-base-100 shadow-xl overflow-hidden">
      <figure className="h-1/2">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body h-1/2 flex flex-col gap-6 p-0 mt-4">
        <div className={`bg-gradient-to-r ${getTagColor(tag)} w-2/3`}>
          <p className="py-2 px-4 text-white -tracking-wider">{tag}</p>
        </div>

        <div className="text-center flex flex-col gap-4 px-6">
          <Link
            to={`/trending-topic/${tag}/details/${_id}`}
            className="text-2xl font-bold -tracking-wide hover:underline"
          >
            {title && title.length > 45 ? `${title.slice(0, 44)}...` : title}
          </Link>
          <p className="-tracking-wider">
            {content && content.length > 151
              ? `${content.slice(0, 150)}...`
              : content}
          </p>
        </div>
        <div className="flex justify-between -tracking-wider text-sm px-6">
          <p className="flex items-center justify-start gap-1">
            <IoPersonCircleOutline />
            {author?.name}
          </p>
          <p className="flex items-center justify-end gap-1">
            <IoTimerOutline />
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardForTopic;
