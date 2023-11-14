/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.get("/createevent");
      navigate("/createevent");
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 1000,
        onClose: () => {
          navigate("/login");
        },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/showallevent");
        console.log(response.data);
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Invoke the fetchData function immediately
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap gap-x-4 gap-y-4 m-4">
        {events.slice(0, 3).map((event) => (
          <div
            key={event._id}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-[600px] h-[550px] p-4 border bg-background border-gray-300 rounded-md"
          >
            <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
            <div className="w-full h-72 border-gray-300 border">
              {event.image ? (
                <img
                  src={event.image}
                  className="object-cover w-full h-full"
                  alt=""
                />
              ) : (
                <p className="text-center flex items-center justify-center h-full">
                  No Image
                </p>
              )}
            </div>
            <p className="text-gray-600  mb-2 p-2 text-xl">
              Location: <span className="">{event.location}</span>
            </p>
            <p className="text-gray-600  mb-2 p-2 text-xl">
              Date: {event.date.slice(0, 10)}
            </p>
            <p className="text-gray-600  mb-2 p-2 text-xl">
              Organizer: {event.organizerId.name}
            </p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => {
                navigate(`/aboutevent/${event._id}`, { state: event._id });
              }}
            >
              Know More
            </button>
          </div>
        ))}
      </div>
      <div className="w-full h-20 flex justify-center items-center ">
        <button
          onClick={handleSubmit}
          className="bg-darkBlue text-white font-bold py-2 px-4 rounded"
        >
          Create Event
        </button>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
