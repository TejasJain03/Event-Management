/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import axiosInstance from "../axios";

export default function BookTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [organizer, setOrganizer] = useState({});
  const [attendees, setAttendees] = useState();
  const [ticketCategories, setTicketCategories] = useState([]);
  const [view, setView] = useState(false);

  const eventId = location.state;

  const [attendeeData, setAttendeeData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/aboutevent/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setOrganizer(response.data.organizerId);
        setTicketCategories(response.data.ticketCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventId]);

  const handleAttendeeChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 5) {
      setAttendees(newValue);
    }
    setView(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attendeeData.length !== attendees) {
      alert("Please enter details for all attendees.");
      return;
    }

    const allAttendeesData = attendeeData.map((data) => ({
      ...data,
      purchaseDate: new Date(),
    }));
    navigate(`/paymentconfirmation/${eventId}`, { state: allAttendeesData });
  };

  const renderAttendeeDetails = () => {
    const details = [];
    for (let i = 0; i < attendees; i++) {
      details.push(
        <div key={i} className="gap-y-10 h-auto">
          <h3 className="text-left text-xl font-bold">
            Details of Attendee {i + 1}
          </h3>
          <div className="grid text-left my-2 border-b-2 border-gray-300 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor={`name-${i}`}
                className="block text-sm font-semibold"
              >
                Name:
              </label>
              <input
                type="text"
                id={`name-${i}`}
                name={`name-${i}`}
                value={attendeeData[i]?.name || ""}
                onChange={(e) =>
                  handleAttendeeDataChange(i, "name", e.target.value)
                }
                required
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`email-${i}`}
                className="block text-sm  font-semibold"
              >
                Email:
              </label>
              <input
                type="email"
                id={`email-${i}`}
                name={`email-${i}`}
                value={attendeeData[i]?.email || ""}
                onChange={(e) =>
                  handleAttendeeDataChange(i, "email", e.target.value)
                }
                required
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`phone-${i}`}
                className="block text-sm font-semibold"
              >
                Phone:
              </label>
              <input
                type="tel"
                id={`phone-${i}`}
                name={`phone-${i}`}
                value={attendeeData[i]?.phone || ""}
                onChange={(e) =>
                  handleAttendeeDataChange(i, "phone", e.target.value)
                }
                required
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`ticket-category-${i}`}
                className="block text-sm font-semibold"
              >
                Ticket Category:
              </label>
              <select
                id={`ticket-category-${i}`}
                name={`ticket-category-${i}`}
                onChange={(e) =>
                  handleAttendeeDataChange(
                    i,
                    "ticketCategory",
                    JSON.parse(e.target.value)
                  )
                }
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select a Ticket Category</option>
                {ticketCategories.map((category) => (
                  <option
                    key={category.name}
                    value={JSON.stringify({
                      name: category.name,
                      price: category.price,
                    })}
                  >
                    {category.name} - INR {category.price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    }
    return details;
  };

  const handleAttendeeDataChange = (index, name, value) => {
    const updatedAttendeeData = [...attendeeData];
    if (!updatedAttendeeData[index]) {
      updatedAttendeeData[index] = {};
    }
    updatedAttendeeData[index][name] = value;
    setAttendeeData(updatedAttendeeData);
  };

  return (
    <>
      <Navbar />
      <div className="w-full text-center mt-10">
        <h1 className="text-4xl font-bold  ">Books your Tickets!!!</h1>
      </div>
      <div className="flex flex-col w-full h-auto items-center justify-center">
        <div className="md:w-1/3 p-4 m-4 text-3xl text-center">
          <h3 className="font-bold mb-4 text-3xl sm:text-4xl">{event.name}</h3>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold">Location:</span> {event.location}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold">Date:</span>{" "}
            {event.date ? event.date.slice(0, 10) : "Date not available"}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold">Organized By:</span>{" "}
            {organizer.name}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold">Organizer Phone Number:</span>{" "}
            {organizer.phoneNumber || "Phone number not provided"}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold">Organizer Email:</span>{" "}
            {organizer.email || "Email not provided"}
          </p>
        </div>

        <div className="md:w-2/3 p-10 h-auto m-10 text-center">
          <form onSubmit={handleSubmit} className="">
            <label htmlFor="attendees" className="mt-10">
              No. of Attendees
              <input
                type="number"
                id="attendees"
                onChange={handleAttendeeChange}
                min={1}
                max={5}
                placeholder="0"
                className="ml-2 p-2 border rounded"
              />
            </label>

            {view && (
              <div className="mt-4">
                {renderAttendeeDetails()}

                <button
                  type="submit"
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Attendees
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
