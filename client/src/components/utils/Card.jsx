/* eslint-disable react/prop-types */
import { Link  } from "react-scroll";

const Card = ({ title, content, linkTo }) => (
  <div className="w-full lg:w-80 h-96 rounded-2xl bg-background p-4 shadow-xl mb-4 lg:mb-0 lg:mr-4">
    <h1 className="text-center text-2xl p-auto h-10 border-b-2 border-primary">
      {title}
    </h1>
    <p className="text-left text-lg p-2">{content}</p>
    <div className="flex items-center justify-start pl-2">
      <Link to={linkTo} smooth={true} duration={1000}>
        <h1 className="text-darkBlue font-bold cursor-pointer">Read More...</h1>
      </Link>
    </div>
  </div>
);

export default Card;
