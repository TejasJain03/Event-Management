/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/api/createevent", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/showallevent")
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Event List</h1>
      {events.map((event) => (
        <ul key={event._id}>
          <li> {event.name}</li>
          <li>{event.location}</li>
          <button
            onClick={() => {
              console.log(event._id);
            }}
          >
            Click Here
          </button>
        </ul>
      ))}
      <button onClick={handleSubmit}>Create Event</button>
    </div>
  );
}
