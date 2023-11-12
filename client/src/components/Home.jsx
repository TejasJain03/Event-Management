/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import { useEffect, useState } from "react";
import Card from "./utils/Card";
import HashLoader from "react-spinners/HashLoader";
import Section from "./utils/Section";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handlesubmit = () => {
    navigate("/showallevent");
  };

  return (
    <>
      {loading ? (
        <div className="flex w-screen h-screen justify-center items-center">
          <HashLoader color="#004E98" size={100} />
        </div>
      ) : (
        <>
          <Navbar />

          <div className="flex flex-col lg:flex-row justify-between items-center bg-gray-100/40  py-14 px-4 lg:px-10">
            <div className="flex flex-col justify-center  lg:items-start mb-8  lg:mb-0 lg:mr-10">
              <h1 className="text-[#3498db] font-extrabold text-5xl text-center lg:text-left mb-4">
                Your Event, Our Expertise, Unforgettable Moments
              </h1>
              <button className="bg-darkBlue font-bold p-4 mx-12 lg:mx-0 rounded-lg text-white">
                Discover Events
              </button>
            </div>
            <img
              className="hidden sm:block h-[50vh] object-cover"
              src="https://hire4event.com/blogs/wp-content/uploads/2019/05/Event-Management-Proposal-Hire4event.jpg"
              alt=""
            />
          </div>
          <div>
            <div className="mx-4 lg:mx-32">
              <Section
                id="AboutUs"
                title="About Us"
                content="Welcome to EventEase - your premier destination for seamless event management! Navigate the world of event creation and ticket collection effortlessly with our user-friendly platform. Craft and personalize your events with ease, whether it's a corporate conference, vibrant concert, or a community gathering. At EventEase, we prioritize simplicity in the ticketing and registration process. Our intuitive interface ensures a smooth experience for both organizers and attendees. Easily create, customize, and manage event tickets, enhancing the overall journey for participants. Join EventEase, where we transform event planning into a stress-free adventure. From hassle-free ticketing to effortless registration, we're here to make your events unforgettable. Let's elevate your gatherings with the ease and sophistication they deserve!"
              />

              <Section
                id="Ticketing"
                title="Ticketing and Registration"
                content="EventEase streamlines event management with easy ticketing and registration. Organizers enjoy a user-friendly interface for seamless ticket creation. Attendees register effortlessly, choosing from various ticket options and completing secure online transactions. The platform supports discounts and offers, providing instant confirmations and e-tickets. On event day, our robust ticketing system ensures smooth check-ins, reducing queues for a hassle-free experience."
              />

              <Section
                id="Discover"
                title="Discover Events"
                content="Discover a world of exciting events with EventEase's user-friendly platform. Explore diverse public events, from concerts to conferences, and book tickets effortlessly. Our platform provides detailed event information, including schedules and venues, empowering users to make informed choices. With easy booking options, secure transactions, and instant confirmations, EventEase ensures a seamless experience for discovering and attending a variety of events. Explore, book, and immerse yourself in unforgettable experiences with just a few clicks."
                buttonText="Discover Events"
                onClick={handlesubmit}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
