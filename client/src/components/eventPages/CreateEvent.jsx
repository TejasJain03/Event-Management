import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [event, setEvent] = useState();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/createevent", event, {
        withCredentials: true,
      })
      .then((response) => {
        alert(response.data.message);
        navigate("/userevent");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>

        <label>
          Description:
          <input type="text" name="description" onChange={handleInputChange} />
        </label>

        <label>
          Location:
          <input type="text" name="location" onChange={handleInputChange} />
        </label>

        <label>
          Date:
          <input type="date" name="date" onChange={handleInputChange} />
        </label>

        <label>
          Tickets Available:
          <input
            type="Number"
            name="ticketAvailable"
            onChange={handleInputChange}
          />
        </label>
        <label>Is your event Public?</label>
        <label>
          <input
            type="radio"
            name="isPublic"
            value="true"
            onChange={handleInputChange}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="isPublic"
            value="false"
            onChange={handleInputChange}
          />{" "}
          No
        </label>

        <button type="submit">Create Event</button>
      </form>
    </>
  );
}
