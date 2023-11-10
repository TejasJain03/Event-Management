/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect } from "react";
// import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function PaymentConfirm() {
  const location = useLocation();

  const allAttendeesData = location.state;

  const {eventId}=useParams()
  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-order",
        {
          amount: finalTicketPrice(allAttendeesData),
        }
      );

      const callbackUrl = `http://localhost:5000/api/paymentverification?allAttendeesData=${encodeURIComponent(
        JSON.stringify(allAttendeesData)
      )}&eventId=${eventId}`;

      const options = {
        key: "rzp_test_zNM3kqHc0GU30R",
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

  useEffect(()=>{
    console.log(allAttendeesData)
  },[])

  const finalTicketPrice = (allAttendeesData) => {
    let sum = 0;
    allAttendeesData.map((attendee) => {
      sum += attendee.ticketCategory.price;
    });
    return sum;
  };

  return (
    <div>
      <h1>Razorpay Payment Demo</h1>
      <ul>
        {allAttendeesData.map((attendee) => (
          <li key={attendee.name}>
            {attendee.name}-{attendee.ticketCategory.name}-
            {attendee.ticketCategory.price}
          </li>
        ))}
      </ul>

      {<div>Total Amount:{finalTicketPrice(allAttendeesData)}</div>}
      <button onClick={createOrder}>Create Order</button>
    </div>
  );
}
