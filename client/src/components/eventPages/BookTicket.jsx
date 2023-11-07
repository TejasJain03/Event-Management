import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BookTicket() {
  const location = useLocation();
  const eventId = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/event/${eventId}/registerTicket`,formData)
    .then((response)=>{
        console.log(response.data.message)
    })
    .catch((err)=>{
        console.log(err)
    })
    console.log(formData);
  };

  return (
    <>
      <div>
        <h1>User Information Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
