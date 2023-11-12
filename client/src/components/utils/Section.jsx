/* eslint-disable react/prop-types */
import { useState } from "react";

const Section = ({ id, title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="bg-background h-auto lg:h-auto my-10 lg:mx-4  duration-300 rounded-3xl"
      id={id}
    >
      <div className="flex flex-col p-6">
        <h1 className="text-4xl p-2 border-b-2 border-darkBlue font-extrabold">
          {title}
        </h1>
        <p className="p-2 text-xl">
          {isExpanded ? content : content.slice(0, 298)}
        </p>

        <span
          className="text-darkBlue font-bold mt-2 ml-2 hover:cursor-pointer"
          onClick={toggleReadMore}
        >
          {isExpanded ? "Hide More" : "Read More"}
        </span>
      </div>
    </div>
  );
};

export default Section;
