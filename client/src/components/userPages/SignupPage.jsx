import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const { name, email, password, phoneNumber } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", formData)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">Phone:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <span>Already a User??<a href="/login"> Log In</a></span>
    </>
  );
}
