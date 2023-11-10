/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/api/createevent", {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          autoClose: 2000,
          onClose: () => {
            navigate("/login");
          },
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/showallevent")
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl text-center  font-bold m-4">Event List</h1>
      <div className="flex flex-wrap gap-x-4 gap-y-4 m-4">
        {events.slice(0, 3).map((event) => (
          <div
            key={event._id}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-[600px] h-[500px] p-4 border bg-background border-gray-300 rounded-md"
          >
            <h2 className="text-lg font-bold mb-2">{event.name}</h2>
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
            <p className="text-gray-600 mb-2">Location: {event.location}</p>
            <p className="text-gray-600 mb-2">
              Date: {event.date.slice(0, 10)}
            </p>
            <p className="text-gray-600 mb-2">
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
      <div className="w-full h-20 flex justify-center items-center bg-red-200">
        <button
          onClick={handleSubmit}
          className="bg-darkBlue text-white font-bold py-2 px-4 rounded hover:bg-darkBlue"
        >
          Create Event
        </button>
      </div>
      <Footer />
    </div>
  );
}
