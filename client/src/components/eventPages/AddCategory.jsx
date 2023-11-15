/* eslint-disable react/prop-types */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

export default function AddCategory({ eventId }) {
  const [categories, setCategories] = useState([{ name: "", price: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newCategories = [...categories];
    newCategories[index][name] = value;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { name: "", price: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .post(`/api/event/${eventId}/createcategory`, categories)
      .then((response) => {
        toast.success(response.data.message,{autoClose:200,onClose:()=>{navigate('/showuserevents')}});
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mb-6 p-8 border rounded-md shadow-lg bg-background mt-10"
      >
        <h1 className="text-center">Add Ticket Category</h1>
        {categories.map((category, index) => (
          <div key={index} className="mb-4 ">
            <label className="block mb-2">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={(e) => handleInputChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Price:</span>
              <input
                type="number"
                name="price"
                value={category.price}
                onChange={(e) => handleInputChange(index, e)}
                className="form-input mt-1 block w-full"
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-4 ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
