import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import AddCategory from "./AddCategory";
import axiosInstance from "../axios"

export default function UpdateEvent() {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [category, setCategory] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/api/showevent/${eventId}`)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        setDate(response.data.date.slice(0, 10));
        setTicketCategories(response.data.ticketCategories);
      })
      .catch((err) => {
        console.error("Error fetching event details:", err);
      });
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });

    if (name === "image") {
      setEvent({ ...event, image: e.target.files[0] });
    }
  };

  const handleCategoryDelete = (categoryId) => {
    axiosInstance
      .delete(
        `/api/event/${eventId}/deletecategory/${categoryId}`
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(event);
      await axiosInstance.put(
        `/api/updateevent/${eventId}`,
        event,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Event updated successfully!", {
        autoClose: 1000,
        onClose: navigate("/showuserevents"),
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 200,
        onclose: navigate("/showuserevents"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold h-32 text-center ">Update Event</h1>
      <div className="mb-10">
        <form
          onSubmit={handleUpdate}
          encType="multipart/form-data"
          className="max-w-5xl mx-auto p-8 border rounded-md bg-background"
        >
          <label>
            Event Name:
            <input
              type="text"
              name="name"
              value={event.name || ""}
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <label>
            Cover Image:
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              value={event.description || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </label>

          <label>
            Location:
            <input
              type="text"
              name="location"
              value={event.location || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </label>

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={date || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </label>

          <label>
            Tickets Available:
            <input
              type="Number"
              name="ticketAvailable"
              value={event.ticketAvailable || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </label>

          <div className="mb-4">
            <span className="text-gray-700">Is your event Public?</span>
            <div className="mt-2 ">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isPublic"
                  value="true"
                  checked={event.isPublic === true}
                  onChange={handleInputChange}
                  className="form-radio"
                  required
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isPublic"
                  value="false"
                  checked={event.isPublic === false}
                  onChange={handleInputChange}
                  className="form-radio ml-2"
                  required
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="w-full h-64 text-black mb-6">
            <h1 className="mb-2 p-2  border-b-2 border-black/20 ">
              Ticket Categories
            </h1>
            <div className="flex flex-row justify-between w-full border-b-2 font-bold border-black/20 mb-2">
              <span className="p-4  text-center w-20 rounded-xl mb-2">
                Name
              </span>
              <span className="p-4  text-center w-20 rounded-xl mb-2">
                Price
              </span>
              <div className="p-4 text-center w-20 rounded-xl mb-2">Action</div>
            </div>
            {ticketCategories ? (
              ticketCategories.map((category) => (
                <div
                  className="flex flex-row justify-between w-full border-b-2 border-black/20 mb-2"
                  key={category._id}
                >
                  <span className="p-4  text-center w-20 rounded-xl mb-2">
                    {category.name}
                  </span>
                  <span className="p-4  text-center w-20 rounded-xl mb-2">
                    {category.price}
                  </span>
                  <button
                    className="p-4 bg-red-600 text-center w-20 rounded-xl mb-2"
                    onClick={() => {
                      handleCategoryDelete(category._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <h1>No Categories</h1>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-darkBlue text-white px-4 py-2 rounded  w-full"
          >
            {loading ? "Updating Event..." : "Update Event"}
          </button>
        </form>
        <div className="flex flex-col justify-center items-center mt-10">
          <button
            className=" bg-darkBlue p-4 w-80 text-white rounded-md"
            onClick={() => {
              setCategory(true);
            }}
          >
            Want to add a Ticket Category??
          </button>
          {category && <AddCategory eventId={eventId} />}
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}
