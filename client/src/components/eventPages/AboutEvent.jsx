import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const eventId = location.state;
  const [reviews,setReviews]=useState([])
  const [event, setEvent] = useState({});

 

  const navigate=useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/showevent/${eventId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.reviews);
        setEvent(response.data);
        setReviews(response.data.reviews)
      })
      .catch((err) => {
        console.log(err);
        navigate("/showuserevents")
      });
  },[eventId, navigate]);
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
        <li>
          Event Categories:{" "}
          {event.ticketCategories && event.ticketCategories.join(", ")}
        </li>
      </ul>
      <button onClick={()=>{navigate('/booktickets',{state:eventId})}}>Book Tickets</button>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>{review.body}</li>
        ))}
      </ul>
    </>
  );
}
