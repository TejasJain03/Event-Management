import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-darkBlue text-white mt-20 p-6">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4 border-b-2 border-gray-500 pb-4">
            Contact Us
          </h1>
          <p className="mb-2">Tejas Jain - tejaskjain2003@gmail.com</p>
          <p>Adithya J A - jaadithya64@gmail.com</p>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4 border-b-2 border-gray-500 pb-4">
            Address
          </h1>
          <p className="mb-2">
            Mangalore Institute Of Technology and Engineering
          </p>
          <p className="mb-2">
            Badaga Mijar, Solapur - Mangalore Highway, Near Moodabidre
          </p>
          <p>Mangaluru, Karnataka 574225</p>
        </div>
      </div>

      <div className=" mx-auto  text-center mt-8">
        <Link to="/howitworks" className="text-white hover:underline">
          How It Works??
        </Link>
      </div>

      <div className=" mx-auto mt-8 text-center">
        &copy; {new Date().getFullYear()} EventEase. All Rights Reserved.
      </div>
    </div>
  );
}
