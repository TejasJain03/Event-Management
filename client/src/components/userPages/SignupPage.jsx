import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    axiosInstance
      .post("/api/register", formData)
      .then((response) => {
        toast.success(response.data.message,{autoClose:200,onClose:()=>{navigate('/login')}});
      })
      .catch((error) => {
        toast.error(error.response.data.message,{autoClose:200});
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-[500px] h-auto p-8 bg-background rounded-xl mx-auto mt-8"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              className="shadow border rounded h-14 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="shadow border rounded h-14 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              className="shadow border rounded h-14 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="shadow border rounded h-14 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="w-full flex justify-between">
            <button
              type="submit"
              className={`bg-darkBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <button
              type="submit"
              className="bg-darkBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                navigate("/");
              }}
            >
              Go to Home page
            </button>
          </div>

          <div className="mt-4 flex hover:cursor-pointer text-gray-700">
            Already a User?
            <h1
              onClick={() => {
                navigate("/login");
              }}
              className="text-darkBlue font-bold"
            >
              Log In
            </h1>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
}
