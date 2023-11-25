import axiosInstance from "../axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

export default function Home() {
  const location = useLocation();
  const eventId = location.state;
  const [attendees, setAttendees] = useState([]);
  const [view, setView] = useState(false);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAttendees = () => {
    setView(!view);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/api/showevent/${eventId}`)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        setAttendees(response.data.attendees);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          autoClose: 1000,
          onClose: () => {
            navigate("/showuserevents");
          },
        });
      });
  }, [eventId, navigate]);

  const copyToClipboard = () => {
    const linkToCopy=`https://eventeasee.netlify.app/aboutevent/${eventId}`
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        toast.success("Link Copied to Your Clipboard",{autoClose:100})
      })
      .catch(() => {
        toast.error('Unable to copy to clipboard', {autoClose:100});
      });
  };

  const handleDelete = (eventId) => {
    setLoading(true);
    axiosInstance
      .delete(`/api/deleteevent/${eventId}`)
      .then((response) => {
        toast.success(response.data.message, {
          autoClose: 200,
          onClose: () => {
            navigate("/showuserevents");
          },
        });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.respose);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    navigate(`/updateevent/${eventId}`);
  };

  const handleCheckIn = (attendeeId) => {
    axiosInstance
      .post(`/api/event/${eventId}/check-in/${attendeeId}`)
      .then((response) => {
        console.log(response.data);
        const updatedAttendees = attendees.map((attendee) => {
          if (attendee._id === attendeeId) {
            return { ...attendee, checkedIn: true };
          }
          return attendee;
        });

        setAttendees(updatedAttendees);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center ">
        {event.image ? (
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
        ) : (
          <div className="w-full h-[50vh] border-gray-300 border flex items-center justify-center">
            <p className="text-center text-gray-500">No Image</p>
          </div>
        )}

        <div className="my-6 w-auto">
          <div className="flex gap-4 border-b-2 border-gray-300 p-4 w-[600px] items-center justify-center">
            {event.image && (
              <img src={event.image} className="h-20 w-20" alt="" />
            )}
            <h1 className="font-bold text-3xl">{event.name}</h1>
          </div>
          <div className=" flex flex-col justify-center p-4 gap-y-4 border-b-2 border-gray-300">
            <h1 className="text-xl text-gray-600">
              Organized by: {event.organizerId && event.organizerId.name}
            </h1>
            <h1 className=" text-xl text-gray-600">
              Location: {event.location}
            </h1>
            {event && event.date && (
              <h1 className=" text-xl text-gray-600">
                Date: {event.date.slice(0, 10)}
              </h1>
            )}
            <h1 className=" text-xl text-gray-600">
              At: {event.time ? event.time : "No particular time mentioned"}
            </h1>
          </div>
        </div>
        <button
          onClick={handleAttendees}
          className="bg-darkBlue p-3 font-bold rounded-lg  text-white"
        >
          Show attendees
        </button>
      </div>
      {view && (
        <>
          <div className="w-full flex flex-col justify-center items-center p-10">
            <h1 className="text-black text-2xl mb-4">Attendee Details</h1>
            <div className="w-full hidden flex-col sm:flex-row sm:flex bg-secondary p-4">
              <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                <h1 className="text-lg text-black text-center">Name</h1>
              </div>
              <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                <h1 className="text-lg text-black text-center">Email</h1>
              </div>
              <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                <h1 className="text-lg text-black text-center">Phone</h1>
              </div>
              <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                <h1 className="text-lg text-black text-center">AttendeeId</h1>
              </div>
              <div className="w-full sm:w-1/5">
                <h1 className="text-lg text-black text-center">Check-In</h1>
              </div>
            </div>
            <div className="p-4 mx-4 w-full">
              {attendees.length > 0 ? (
                attendees.map((attendee) => (
                  <div
                    key={attendee._id}
                    className="flex flex-col sm:flex-row items-center justify-between mb-2 border-b border-secondary bg-white p-4 rounded-md"
                  >
                    <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                      <h1 className="text-gray-900 text-lg text-center mb-2 p-2 rounded-md">
                        {attendee.name}
                      </h1>
                    </div>
                    <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                      <h1 className="text-gray-900 text-lg text-center mb-2">
                        {attendee.email}
                      </h1>
                    </div>
                    <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                      <h1 className="text-gray-900 text-lg text-center mb-2">
                        {attendee.phone}
                      </h1>
                    </div>
                    <div className="w-full sm:w-1/5 mb-2 sm:mb-0">
                      <h1 className="text-gray-900 text-lg text-center mb-2">
                        {attendee.attendeeId}
                      </h1>
                    </div>
                    <div className="w-full flex justify-center sm:w-1/5">
                      <button
                        className={`px-4 py-2 rounded-lg text-white bg-darkBlue hover:bg-green-600 hover:cursor-pointer disabled:bg-green-600 disabled:cursor-not-allowed ${
                          attendee.checkedIn ? "disabled" : ""
                        }`}
                        disabled={attendee.checkedIn}
                        onClick={() => {
                          handleCheckIn(attendee._id);
                        }}
                      >
                        {attendee.checkedIn ? "Checked In" : "Check-In"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-700">
                  No attendees available
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center gap-x-10 my-4">
        <button
          className="bg-darkBlue p-2 font-bold rounded-lg  text-white"
          onClick={() => {
            navigate("/showuserevents");
          }}
        >
          My Events
        </button>
        <button
          className={`${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600"
          } p-2 font-bold rounded-lg  text-white`}
          onClick={() => {
            !loading && handleDelete(eventId);
          }}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Event"}
        </button>
        <button
          className="bg-green-600 p-2 font-bold rounded-lg  text-white"
          onClick={copyToClipboard}
        >
          Copy Link
        </button>
        <button
          className="bg-darkBlue p-2 font-bold rounded-lg  text-white"
          onClick={handleUpdate}
        >
          Update Event
        </button>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
