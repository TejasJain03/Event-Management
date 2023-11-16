import { useNavigate } from "react-router-dom";
import Navbar from "../utils/Navbar";

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">How EventEase Works</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Create Your Event</h2>
          <p className="text-gray-700">
            Start by creating your own event on EventEase. Provide details such
            as event name, location, date, time, and a captivating description.
            Upload an eye-catching cover image to attract attendees.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            2. Customize Ticket Categories
          </h2>
          <p className="text-gray-700">
            Tailor your event to perfection by creating different ticket
            categories with varied prices and benefits. Whether it's VIP access,
            early bird discounts, or special packages, EventEase allows you to
            offer a personalized experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            3. Explore and Book Events
          </h2>
          <p className="text-gray-700">
            Browse through a diverse range of public events hosted by others.
            Find events that match your interests and book tickets seamlessly.
            EventEase makes it easy to discover and attend exciting gatherings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Receive Ticket Details</h2>
          <p className="text-gray-700">
            Once you've booked your tickets, EventEase ensures you receive
            detailed information about the event, including ticket confirmation,
            venue details, and any additional instructions from the organizer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Secure Online Payments</h2>
          <p className="text-gray-700">
            EventEase provides a secure and convenient payment process. Easily
            purchase your tickets online using various payment options,
            guaranteeing a hassle-free and safe transaction experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Check-In to Events</h2>
          <p className="text-gray-700">
            Event organizers can efficiently check in attendees using the
            EventEase  during the event entry. This streamlines the entry
            process, enhances security, and provides organizers with real-time
            attendance data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            7. Host and Enjoy Your Event
          </h2>
          <p className="text-gray-700">
            As an event organizer, relax and enjoy your event knowing that
            EventEase has streamlined the process for you. Focus on creating
            memorable experiences for your attendees while we take care of the
            logistics.
          </p>
        </section>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              navigate("/showallevent");
            }}
            className="bg-darkBlue text-white px-6 py-3 rounded-full font-semibold "
          >
            Explore events in EventEase
          </button>
        </div>
      </div>
    </>
  );
}
