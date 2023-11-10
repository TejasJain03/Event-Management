import { useNavigate } from "react-router-dom";
import Navbar from "./utils/Navbar";
import { Link as ScrollLink } from "react-scroll";
import Footer from "./utils/Footer";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

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

          <div className="flex py-14 px-4">
            <div className="w-auto bg-red-300 "> Tag Line</div>
            <div className="flex   w-auto justify-center gap-x-20 gap-y-8  ">
              <div className="w-80 h-96 rounded-2xl bg-background p-4 shadow-xl ">
                <h1 className="text-center text-2xl p-auto h-10 border-b-2 border-accent">
                  About Us
                </h1>
                <p className="text-left text-lg">
                  Welcome to [Your Company Name] – your go-to platform for
                  hassle-free event management! From event creation to ticket
                  collection, we've got you covered. Easily create and customize
                  your events with a user-friendly interface....
                </p>
                <ScrollLink to="AboutUs" smooth={true} duration={1000}>
                  <button>Read More...</button>
                </ScrollLink>
              </div>
              <div className="w-80 h-96 rounded-2xl bg-background p-4 shadow-xl">
                <h1 className="text-center text-2xl p-auto h-10 border-b-2 border-accent">
                  Ticket Registration
                </h1>
                <p className="text-left text-lg"></p>
                <ScrollLink to="Ticketing" smooth={true} duration={1000}>
                  <button>Read More...</button>
                </ScrollLink>
              </div>
              <div className="w-80 h-96 rounded-2xl bg-background p-4 shadow-xl">
                <h1 className="text-center text-2xl p-auto h-10 border-b-2 border-accent">
                  Discover Events
                </h1>
                <p className="text-left text-lg"></p>
                <ScrollLink to="Ticketing" smooth={true} duration={1000}>
                  <button>Read More...</button>
                </ScrollLink>
              </div>
            </div>
          </div>
          <div className="">
            <div
              className="bg-darkBlue/40 h-80 my-10 mx-32 hover:mx-4 duration-300 rounded-3xl"
              id="AboutUs"
            >
              <img src="" alt="" />
              <div className="flex">
                <h1>About Us</h1>
                <p>Randome</p>
              </div>
            </div>
            <div
              className="bg-darkBlue/40 h-80 my-10 mx-32 hover:mx-4 duration-300 rounded-3xl"
              id="Ticketing"
            >
              <img src="" alt="" />
              <div className="flex">
                <h1>About Us</h1>
                <p>Randome</p>
              </div>
            </div>
            <div className="bg-darkBlue/40 h-80 my-10 mx-32 hover:mx-4 duration-300 rounded-3xl">
              <img src="" alt="" />
              <div className="flex">
                <h1>About Us</h1>
                <p>Randome</p>
              </div>
            </div>
          </div>
          <button onClick={handlesubmit}>showEvents</button>
          <Footer />
        </>
      )}
    </>
  );
}
