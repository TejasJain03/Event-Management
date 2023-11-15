import { useState, useEffect } from "react";
import axiosInstance from "../axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import "react-toastify/dist/ReactToastify.css";

export default function UserEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axiosInstance
      .get("/api/logout", { withCredentials: true })
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
    axiosInstance
      .get("/api/showuserevent")
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
      <Navbar />
      <h1 className="text-5xl font-bold mb-4 text-center p-6">My Events</h1>
      <div className="flex  justify-evenly p-4 mx-1">
        {events.map((event) => (
          <div
            key={event._id}
            className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4  p-4 border bg-background shadow-xl border-gray-300 rounded-md"
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
            <p className="text-gray-600 font-extrabold mb-2 p-2 text-xl">
              Location: <span className="">{event.location}</span>
            </p>
            <p className="text-gray-600 font-extrabold mb-2 p-2 text-xl">
              Date: {event.date.slice(0, 10)}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  navigate("/manageevent", { state: event._id });
                }}
                className="bg-darkBlue text-white px-4 py-2 rounded "
              >
                Manage Event
              </button>
              <button
                onClick={() => {
                  navigate(`/aboutevent/${event._id}`, { state: event._id });
                }}
                className="bg-green-600 text-white px-4 py-2 rounded "
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-40 flex flex-col gap-y-10 sm:flex-row justify-center items-center sm:gap-x-10">
        <button
          onClick={() => {
            navigate(`/createevent`);
          }}
          className="bg-darkBlue text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create a New Event
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-500 duration-300 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}
