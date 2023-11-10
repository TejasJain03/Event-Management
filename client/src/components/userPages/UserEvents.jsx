import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import "react-toastify/dist/ReactToastify.css";

export default function UserEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/api/logout", { withCredentials: true })
      .then((response) => {
        toast.success(response.data.message, {
          autoClose: 1000,
          onClose: () => {
            navigate("/login");
          },
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          autoClose: 1000,
          onClose: () => {
            navigate("/login");
          },
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/showuserevent", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          autoClose: 100,
          onClose: () => {
            navigate("/login");
          },
        });
      });
  }, [navigate]);

  return (
    <div>

      <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Event List</h1>
      <div className="flex flex-wrap gap-4 mx-1">
        {events.map((event) => (
          <div
            key={event._id}
            className="w-full sm:w-1/2 md:w-1/3 mb-4 p-4 border bg-background border-gray-300 rounded-md"
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

            <div className="flex justify-between">
              <button
                onClick={() => {
                  navigate("/manageevent", { state: event._id });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Manage Event
              </button>
              <button
                onClick={() => {
                  navigate(`/aboutevent/${event._id}`, { state: event._id });
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate(`/createevent`);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create a New Event
      </button>
      <button
        onClick={handleSubmit}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
      <ToastContainer />
      <Footer/>
    </div>
  );
}
