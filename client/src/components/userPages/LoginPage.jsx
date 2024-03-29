import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    axiosInstance
      .post("/api/login", formData)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          autoClose: 1000,
          onClose: () => {
            navigate("/showuserevents");
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          autoClose: 1000,
          onClose: () => {
            navigate("/login");
          },
        });
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
          className="w-[500px] h-auto p-8 bg-background rounded-xl  mx-auto mt-8"
        >
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
              className="shadow  border rounded h-14 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
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
              className="shadow  border rounded h-14 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
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
              {loading ? "Logging In..." : "Log In"}
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
          <div className="mt-4  flex hover:cursor-pointer ">
            New here?
            <p
              onClick={() => {
                navigate("/signup");
              }}
              className="text-darkBlue font-bold "
            >
              Sign Up!!
            </p>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
}
