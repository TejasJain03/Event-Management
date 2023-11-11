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
          <div className="flex flex-col  justify-between items-center py-14 px-4 lg:px-10">
            <div className="flex items-center h-[40vh] gradient-text mb-8 lg:mb-0 lg:mr-10">
              Your Event, Our Expertise, Unforgettable Moments
            </div>
            <div className="flex flex-col lg:flex-row justify-evenly w-full  lg:gap-y-8">
              <Card
                id="AboutUs"
                title="About Us"
                content="Welcome to EventEase - your go-to platform for hassle-free event management! From event creation to ticket collection, we've got you covered. Easily create and customize your events with a user-friendly interface...."
                linkTo="AboutUs"
              />
              <Card
                id="Ticketing"
                title="Ticket Registration"
                content="Welcome to EventEase - your premier destination for seamless event management! Navigate the world of event creation and ticket collection effortlessly with our user-friendly platform...."
                linkTo="Ticketing"
              />
              <Card
                id="Discover"
                title="Discover Events"
                content="Welcome to EventEase - your premier destination for seamless event management! Navigate the world of event creation and ticket collection effortlessly with our user-friendly platform"
                linkTo="Discover"
              />
            </div>
          </div>

          <div className="mx-4 lg:mx-32">
            <Section
              id="AboutUs"
              title="About Us"
              content="Welcome to EventEase - your premier destination for seamless event management! Navigate the world of event creation and ticket collection effortlessly with our user-friendly platform. Craft and personalize your events with ease, whether it's a corporate conference, vibrant concert, or a community gathering. At EventEase, we prioritize simplicity in the ticketing and registration process. Our intuitive interface ensures a smooth experience for both organizers and attendees. Easily create, customize, and manage event tickets, enhancing the overall journey for participants. Join EventEase, where we transform event planning into a stress-free adventure. From hassle-free ticketing to effortless registration, we're here to make your events unforgettable. Let's elevate your gatherings with the ease and sophistication they deserve!"
            />

            <Section
              id="Ticketing"
              title="Ticketing and Registration"
              content="Welcome to EventEase - your premier destination for seamless event management! Navigate the world of event creation and ticket collection effortlessly with our user-friendly platform. Craft and personalize your events with ease, whether it's a corporate conference, vibrant concert, or a community gathering. At EventEase, we prioritize simplicity in the ticketing and registration process. Our intuitive interface ensures a smooth experience for both organizers and attendees. Easily create, customize, and manage event tickets, enhancing the overall journey for participants. Join EventEase, where we transform event planning into a stress-free adventure. From hassle-free ticketing to effortless registration, we're here to make your events unforgettable. Let's elevate your gatherings with the ease and sophistication they deserve!"
            />

            <Section
              id="Discover"
              title="Discover Events"
              content="Welcome to EventEase - your premier destination for seamless event management! Navigate the world of event creation and ticket collection effortlessly with our user-friendly platform. Craft and personalize your events with ease, whether it's a corporate conference, vibrant concert, or a community gathering. At EventEase, we prioritize simplicity in the ticketing and registration process. Our intuitive interface ensures a smooth experience for both organizers and attendees. Easily create, customize, and manage event tickets, enhancing the overall journey for participants. Join EventEase, where we transform event planning into a stress-free adventure. From hassle-free ticketing to effortless registration, we're here to make your events unforgettable. Let's elevate your gatherings with the ease and sophistication they deserve!"
              buttonText="Discover Events"
              onClick={handlesubmit}
            />
          </div>

          <Footer />
        </>
      )}
    </>
  );
}
