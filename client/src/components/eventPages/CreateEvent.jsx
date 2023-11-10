import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateEvent() {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setEvent({ ...event, [name]: e.target.files[0] });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createevent",
        event,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      navigate("/showuserevents");
    } catch (err) {
      console.log(err);
      toast.err(err.response.data.message);
      navigate("/createevent");
    } finally {
      setLoading(false);
    }
    console.log(event);
    console.log(event.name);
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Event Name:
          <input type="text" name="name" onChange={handleInputChange} required/>
        </label>

        <label htmlFor="image">
          Cover Image:
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleInputChange}
          />
        </label>

        <label>
          Description:
          <input type="text" name="description" onChange={handleInputChange} required/>
        </label>

        <label>
          Location:
          <input type="text" name="location" onChange={handleInputChange} required />
        </label>

        <label>
          Date:
            
          <input type="date" name="date" onChange={handleInputChange} required />
        </label>

        <label>
          Tickets Available:
          <input
            type="Number"
            name="ticketAvailable"
            onChange={handleInputChange}
            required
          />
        </label>
        <label>Is your event Public?</label>
        <label>
          <input
            type="radio"
            name="isPublic"
            value="true"
            onChange={handleInputChange}
            required
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="isPublic"
            value="false"
            onChange={handleInputChange}
            required
          />{" "}
          No
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Event..." : "Create Event"}
        </button>
        <ToastContainer />
      </form>
    </>
  );
}
