import axios from "../axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

export default function Home() {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  const [ticketCategories, setTicketCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/aboutevent/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        setTicketCategories(response.data.ticketCategories);
      })
      .catch((err) => {
        console.log(err);
        navigate("/showuserevents");
      });
  }, [id, navigate]);
  return (
    <>
      <Navbar />
      <h1 className="text-5xl font-bold py-10 text-center">Event Details</h1>
      <div className="flex flex-col justify-center items-center ">
        <div className="relative flex justify-center w-full items-center rounded-3xl border-gray-300">
          <img
            src={event.image}
            className="object-fit w-full h-[50vh] sm:blur-[4px]"
            alt=""
          />
          <img
            loading="lazy"
            className="object-fit absolute max-w-[90vw] sm:max-w-[50vw] max-h-[50vh] "
            src={event.image}
            alt=""
          />
        </div>

        <div className="my-6 w-auto">
          <div className="flex gap-4 border-b-2 border-gray-300 p-4 w-96 justify-center">
            <img src={event.image} className="h-10 w-10" alt="" />
            <h1 className="font-bold text-3xl">{event.name}</h1>
          </div>
          <div className=" flex flex-col justify-center p-4 gap-y-4 border-b-2 border-gray-300">
            <h1 className="text-gray-600 text-xl">Organized by: {event.organizerId && event.organizerId.name}</h1>
            <h1 className=" text-gray-600 text-xl">Location: {event.location}</h1>
            {event && event.date && (
              <h1 className=" text-gray-600 text-xl">Date: {event.date.slice(0, 10)}</h1>
            )}
            <h1 className=" text-gray-600 text-xl">At: {event.time && event.time}</h1>
          </div>
          <div>
            <h1 className=" text-gray-600 text-xl border-b border-gray-300 p-4">
              Description
            </h1>
            <p className="p-4 text-gray-600">{event.description}</p>
          </div>
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 py-2 px-4 font-bold">
                    Category
                  </th>
                  <th className="border border-gray-300 py-2 px-4 font-bold">
                    Price (INR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ticketCategories.map((category) => (
                  <tr key={category._id}>
                    <td className="border border-gray-300 py-2 px-4">
                      {category.name}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      INR {category.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center p-4">
            {new Date(event.date) > new Date() ? (
              <button
                onClick={() => {
                  navigate("/booktickets", { state: id });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Book Tickets
              </button>
            ) : (
              <p className="text-red-500">Event Ended, Sorry :(</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
