import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if(response.data.success){
          navigate('/showuserevents')
        }
        
      })
      .catch((error) => {
        alert(error.request.response)
        console.log(error.request.response)
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}
