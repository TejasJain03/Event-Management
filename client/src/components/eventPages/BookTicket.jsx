/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [organizer, setOrganizer] = useState({});
  const [attendees, setAttendees] = useState();
  const [ticketCategories, setTicketCategories] = useState([]);
  const [view, setView] = useState(false);

  const eventId = location.state;

  const [attendeeData, setAttendeeData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/aboutevent/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setOrganizer(response.data.organizerId);
        setTicketCategories(response.data.ticketCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventId]);

  const handleAttendeeChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 5) {
      setAttendees(newValue);
    }
    setView(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attendeeData.length !== attendees) {
      alert("Please enter details for all attendees.");
      return;
    }

    const allAttendeesData = attendeeData.map((data) => ({
      ...data,
      purchaseDate: new Date(),
    }));
    navigate(`/paymentconfirmation/${eventId}`, { state: allAttendeesData });
  };

  const renderAttendeeDetails = () => {
    const details = [];
    for (let i = 0; i < attendees; i++) {
      details.push(
        <div key={i}>
          <h3>Attendee {i + 1}</h3>
          <label htmlFor={`name-${i}`}>Name:</label>
          <input
            type="text"
            id={`name-${i}`}
            name={`name-${i}`}
            value={attendeeData[i]?.name || ""}
            onChange={(e) =>
              handleAttendeeDataChange(i, "name", e.target.value)
            }
            required
          />
          <label htmlFor={`email-${i}`}>Email:</label>
          <input
            type="email"
            id={`email-${i}`}
            name={`email-${i}`}
            value={attendeeData[i]?.email || ""}
            onChange={(e) =>
              handleAttendeeDataChange(i, "email", e.target.value)
            }
            required
          />
          <label htmlFor={`phone-${i}`}>Phone:</label>
          <input
            type="tel"
            id={`phone-${i}`}
            name={`phone-${i}`}
            value={attendeeData[i]?.phone || ""}
            onChange={(e) =>
              handleAttendeeDataChange(i, "phone", e.target.value)
            }
            required
          />
          <label htmlFor={`ticket-category-${i}`}>Ticket Category:</label>
          <select
            id={`ticket-category-${i}`}
            name={`ticket-category-${i}`}
            onChange={(e) =>
              handleAttendeeDataChange(
                i,
                "ticketCategory",
                JSON.parse(e.target.value)
              )
            }
          >
            <option value="">Select a Ticket Category</option>
            {ticketCategories.map((category) => (
              <option
                key={category.name}
                value={JSON.stringify({
                  name: category.name,
                  price: category.price,
                })}
              >
                {category.name} - ${category.price}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return details;
  };

  const handleAttendeeDataChange = (index, name, value) => {
    const updatedAttendeeData = [...attendeeData];
    if (!updatedAttendeeData[index]) {
      updatedAttendeeData[index] = {};
    }
    updatedAttendeeData[index][name] = value;
    setAttendeeData(updatedAttendeeData);
  };

  return (
    <div>
      <h1>Book Your Tickets</h1>
      <h3>{event.name}</h3>
      <p>Location:{event.location}</p>
      <p>Date:{event.date}</p>
      <p>Organized By:{organizer.name}</p>
      <p>Organizer Phone Number:{organizer.phoneNumber}</p>
      <p>Organizer Email:{organizer.email}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="attendees">
          No. of Attendees
          <input
            type="number"
            id="attendees"
            onChange={handleAttendeeChange}
            min={1}
            max={5}
            placeholder="0"
          />
          <button type="submit" onClick={handleAttendeeChange}>
            Submit
          </button>
        </label>
      </form>
      {view && renderAttendeeDetails()}
      {view && <button onClick={handleSubmit}>Submit Attendees</button>}
    </div>
  );
}
