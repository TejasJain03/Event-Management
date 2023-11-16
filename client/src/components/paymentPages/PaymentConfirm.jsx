/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../axios";

export default function PaymentConfirm() {
  const location = useLocation();
  const [key, setKey] = useState();

  const allAttendeesData = location.state;

  const { eventId } = useParams();
  const createOrder = async () => {
    try {
      const response = await axiosInstance.post("/api/create-order", {
        amount: finalTicketPrice(allAttendeesData),
      });

      const callbackUrl = `http://localhost:5000/api/paymentverification?allAttendeesData=${encodeURIComponent(
        JSON.stringify(allAttendeesData)
      )}&eventId=${eventId}`;

      const options = {
        key: key,
        amount: response.data.amount,
        currency: response.data.currency,
        name: "Event Management",
        description: "Ticket payment",
        order_id: response.data.id,
        callback_url: callbackUrl,
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/api/get-key")
      .then((response) => {
        setKey(response.data.key);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const finalTicketPrice = (allAttendeesData) => {
    let sum = 0;
    allAttendeesData.map((attendee) => {
      sum += attendee.ticketCategory.price;
    });
    return sum;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] mx-auto p-8 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 px-4">Payment Confirmation!!</h1>
        <div className="flex font-extrabold justify-between border-b-2 border-gray-300 p-4">
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
        </div>
        <ul className="mb-4">
          {allAttendeesData.map((attendee) => (
            <div
              className="flex justify-between border-b-2 border-gray-300 p-4"
              key={attendee.name}
            >
              <span>{attendee.name}</span>
              <span>{attendee.ticketCategory.name}</span>
              <span>{attendee.ticketCategory.price}</span>
            </div>
          ))}
        </ul>

        <div className="mb-4 px-4">
          <p className="font-bold">
            Total Amount: INR {finalTicketPrice(allAttendeesData)}
          </p>
        </div>

        <button
          onClick={createOrder}
          className="bg-darkBlue text-white ml-4 px-4 py-2 rounded "
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}
