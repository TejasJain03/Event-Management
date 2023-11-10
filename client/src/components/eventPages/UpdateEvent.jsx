import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateEvent() {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/showevent/${eventId}`,{withCredentials:true})
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => {
        console.error("Error fetching event details:", err);
      });
  }, [eventId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });

    if (name === "image") {
      setEvent({ ...event, image: e.target.files[0] });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(event)
      await axios.put(
        `http://localhost:5000/api/updateevent/${eventId}`,
        event,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Event updated successfully!",{autoClose:1000,onClose:navigate("/showuserevents")});
      
    } catch (err) {
      toast.error(err.response.data.message,{autoClose:200,onclose:navigate('/showuserevents')});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={event.name || ""}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Cover Image:
          <input type="file" name="image" onChange={handleInputChange} />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={event.description || ""}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={event.location || ""}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={event.date || ""}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Tickets Available:
          <input
            type="Number"
            name="ticketAvailable"
            value={event.ticketAvailable || ""}
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
            checked={event.isPublic === true}
            onChange={handleInputChange}
            required
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="isPublic"
            value="false"
            checked={event.isPublic === false}
            onChange={handleInputChange}
            required
          />
          No
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating Event..." : "Update Event"}
        </button>
        <ToastContainer />
      </form>
    </>
  );
}
