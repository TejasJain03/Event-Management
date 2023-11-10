import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const location = useLocation();
  const eventId = location.state;
  const [attendees, setAttendees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [view, setView] = useState(false);
  const [event, setEvent] = useState({});
  const [ticketCategories, setTicketCategories] = useState([]);

  const handleAttendees = () => {
    setView(!view);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/showevent/${eventId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        setAttendees(response.data.attendees);
        setTicketCategories(response.data.ticketCategories)
        setReviews(response.data.reviews);
      })
      .catch((err) => {
        toast.error(err.response.data.message,{autoClose:1000,onClose:()=>{navigate("/showuserevents");}});

      });
  }, [eventId, navigate]);

  const handleDelete=()=>{
    axios.delete(`http://localhost:5000/api/deleteevent/${eventId}`)
    .then((response)=>{
      console.log(response.data)
    })
    .catch((err)=>{
      console.log(err.respose.data)
    })
  }

  const handleUpdate=()=>{
    navigate(`/updateevent/${eventId}`)
  }

  const handleCheckIn = (attendeeId) => {
    axios
      .post(
        `http://localhost:5000/api/event/${eventId}/check-in/${attendeeId}`,
        { withCredentials: true }
      )
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
      <h2>Event Details</h2>
      <ul>
        <li>Name: {event.name}</li>
        <li>Description: {event.description}</li>
        <li>Location: {event.location}</li>
        <li>Date: {event.date}</li>
        <li>Organizer: {event.organizer && event.organizer.name}</li>
        <li>Attendees: {event.attendees ? event.attendees.length : 0}</li>
        <li>Tickets Available: {event.ticketAvailable}</li>
        <img src={event.image} alt="" />
        <ul>
          {ticketCategories.map((category) => (
            <li key={category._id}>
              {category.name} - INR {category.price}
            </li>
          ))}
        </ul>
      </ul>
      <button onClick={handleAttendees}>Show attendees</button>
      {view && (
        <ul>
          {attendees.map((attendee) => (
            <div key={attendee._id}>
              <li>{attendee.name}</li>
              <button
                disabled={attendee.checkedIn}
                onClick={() => {
                  handleCheckIn(attendee._id);
                }}
              >
                checkedIn
              </button>
            </div>
          ))}
        </ul>
      )}
      <button
        onClick={() => {
          navigate("/showuserevents");
        }}
      >
        My Events
      </button>
      <button onClick={handleDelete}>Delete Event</button>
      <button onClick={handleUpdate}>Update Event</button>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>{review.body}</li>
        ))}
      </ul>
      <ToastContainer/>
    </>
  );
}
