import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function UserEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/logout", { withCredentials: true })
      .then((response) => {
        alert(response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
        navigate("/login");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/showuserevent", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err.response.data.message);
      });
  }, [navigate]);

  return (
    <div>
      <h1>Event List</h1>
      {events.map((event) => (
        <ul key={event._id}>
          <li> {event.name}</li>
          <li>{event.location}</li>
          <button
            onClick={() => {
              navigate("/userevent", { state: event._id });
            }}
          >
            Click Here
          </button>
        </ul>
      ))}

      <button onClick={handleSubmit}>Logout</button>
    </div>
  );
}
