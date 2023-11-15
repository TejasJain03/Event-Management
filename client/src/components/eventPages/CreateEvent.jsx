import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import AddCategory from "./AddCategory";
import axiosInstance from "../axios";

export default function CreateEvent() {
  const [event, setEvent] = useState({});
  const [eventId, setEventId] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setEvent({ ...event, [name]: e.target.files[0] });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/createevent", event, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEventId(response.data.data._id);
      toast.success(response.data.message,{autoClose:200});
      setCategory(true);
    } catch (err) {
      console.log(err);
      toast.err(err.response.data.message);
      navigate("/createevent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold h-32 text-center ">Create An Event</h1>
      <div className="mb-10">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="max-w-5xl mx-auto p-8 border rounded-md bg-background"
        >
          <label className="block mb-4">
            <span className="text-gray-700">
              What is the name of your Event:
            </span>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Cover Image:</span>
            <input
              className="block w-full text-sm text-gray-900 border  border-gray-300  cursor-pointer bg-gray-50  focus:outline-none"
              id="image"
              onChange={handleInputChange}
              name="image"
              type="file"
            ></input>
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              PNG and JPG Only.
            </p>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Description:</span>
            <textarea
              type="text"
              name="description"
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Location:</span>
            <input
              type="text"
              name="location"
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Date:</span>
            <input
              type="date"
              name="date"
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <label className="block mb-4" htmlFor="time">
            <span className="text-gray-700">Time:</span>
            <input
              type="time"
              name="time"
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Tickets Available:</span>
            <input
              type="number"
              name="ticketAvailable"
              onChange={handleInputChange}
              required
              min={0}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <div className="mb-4">
            <span className="text-gray-700">Is your event Public?</span>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isPublic"
                  value="true"
                  onChange={handleInputChange}
                  required
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="isPublic"
                  value="false"
                  onChange={handleInputChange}
                  required
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-darkBlue text-white px-4 py-2 rounded  w-full"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>

        {category && <AddCategory eventId={eventId} />}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
