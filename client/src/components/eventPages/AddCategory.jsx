/* eslint-disable react/prop-types */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axios";

export default function AddCategory({ eventId }) {
  const [categories, setCategories] = useState([{ name: "", price: "" }]);

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
    axios
      .post(`/event/${eventId}/createcategory`, categories)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log("Submitted:", categories);
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
