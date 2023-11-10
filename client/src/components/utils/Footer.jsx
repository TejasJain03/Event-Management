export default function Footer() {
    return (
      <>
        <div className="bg-darkBlue h-auto w-full">
          <div className="flex flex-col lg:flex-row gap-10 h-full p-6">
            <div className="bg-red-600 h-64 lg:w-1/3">
              <h1>Contact Us</h1>
              <p>Tejas Jain - tejas@example.com</p>
              <p>Adithya J A - adithya@example.com</p>
            </div>
            <div className="bg-red-600 h-64 lg:w-1/3">
              <h1>Address</h1>
              <p>Mangalore Institute Of Technology and Engineering</p>
              <p>Badaga Mijar, Solapur -Mangalore Highway, Near Moodabidre,</p>
              <p>Mangaluru, Karnataka 574225</p>
            </div>
            <div className="bg-red-600 h-64 lg:w-1/3">
              <h1>About Us</h1>
              <p>Create Ticket registration</p>
              <p>Learn more about our mission and services.</p>
            </div>
          </div>
          <div className="w-full bg-darkBlue border-t-2 border-black h-[20%] text-center px-6">
            &copy; {new Date().getFullYear()} Your Company Name. All Rights
            Reserved.
          </div>
        </div>
      </>
    );
  }
  