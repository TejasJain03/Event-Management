import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"

export default function UpdateEvent() {
  const location = useLocation();
  const event = location.state;
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/api/showuserevent",)
  };

  return (
    <form onSubmit={handleSubmit}>
  <label>
    Event Name:
    <input
      type="text"
      name="name"
      value={editedEvent.name}
      onChange={handleInputChange}
    />
  </label>

  <label>
    Description:
    <input
      type="text"
      name="description"
      value={editedEvent.description}
      onChange={handleInputChange}
    />
  </label>

  <label>
    Location:
    <input
      type="text"
      name="location"
      value={editedEvent.location}
      onChange={handleInputChange}
    />
  </label>

  <label>
    Date:
    <input
      type="date"
      name="date"
      value={editedEvent.date}
      onChange={handleInputChange}
    />
  </label>

  <label>
    Tickets Available:
    <input
      type="number"
      name="ticketAvailable"
      value={editedEvent.ticketAvailable}
      onChange={handleInputChange}
    />
  </label>

  <label>
    Tickets Category:
    <input
      type="text"
      name="ticketCategories"
      value={editedEvent.ticketCategories}
      onChange={handleInputChange}
    />
  </label>

  <button type="submit">Save Changes</button>
</form>

  );
}
