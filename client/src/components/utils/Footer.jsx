export default function Footer() {
  return (
    <>
      <div className="bg-darkBlue h-auto w-full bottom-0">
        <div className="flex flex-col lg:flex-row gap-10 h-full p-6">
          <div className=" h-64 lg:w-1/2 text-white p-4 ">
            <h1 className="text-2xl font-bold mb-4 border-b-2 border-black/50 pb-4">
              Contact Us
            </h1>
            <p className="mb-2">Tejas Jain - tejaskjain2003@gmail.com</p>
            <p>Adithya J A - jaadithya64@gmail.com</p>
          </div>
          <div className=" h-64 lg:w-1/2 text-white p-4">
            <h1 className="text-2xl font-bold mb-4 border-b-2 border-black/50 pb-4">
              Address
            </h1>
            <p className="mb-2">
              Mangalore Institute Of Technology and Engineering
            </p>
            <p className="mb-2">
              Badaga Mijar, Solapur -Mangalore Highway, Near Moodabidre,
            </p>
            <p>Mangaluru, Karnataka 574225</p>
          </div>
        </div>
        <div className="w-full bg-darkBlue  h-[20%] text-white text-center ">
          &copy; {new Date().getFullYear()} EventEase. All Rights Reserved.
        </div>
      </div>
    </>
  );
}
