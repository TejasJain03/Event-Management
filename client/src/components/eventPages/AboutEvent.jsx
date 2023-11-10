import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [event, setEvent] = useState({});

  const [ticketCategories, setTicketCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/aboutevent/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setEvent(response.data);
        setTicketCategories(response.data.ticketCategories);
        setReviews(response.data.reviews);
      })
      .catch((err) => {
        console.log(err);
        navigate("/showuserevents");
      });
  }, [id, navigate]);
  return (
    <>
      <h2>Event Details</h2>
      <ul>
        <li>Name: {event.name}</li>
        <li>Description: {event.description}</li>
        <li>Location: {event.location}</li>
        <li>Date: {event.date}</li>
        <li>Organizer: {event.organizerId && event.organizerId.name}</li>
        <li>Tickets Available: {event.ticketAvailable}</li>
        <img loading="lazy" src={event.image}></img>
        <ul>
          {ticketCategories.map((category) => (
            <li key={category._id}>{category.name}-INR{category.price}</li>
          ))}
        </ul>
      </ul>
      <button
        onClick={() => {
          navigate("/booktickets", { state: id });
        }}
      >
        Book Tickets
      </button>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>{review.body}</li>
        ))}
      </ul>
    </>
  );
}
