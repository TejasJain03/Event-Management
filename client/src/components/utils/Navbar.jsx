import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-darkBlue h-20 sticky top-0 w-full">
        <ul className="flex justify-between items-center h-full mx-4 sm:mx-10">
          <li className="text-2xl font-extrabold">LOGO</li>
          <li
            className="cursor-pointer"
            onClick={() => {
              navigate("/showallevent");
            }}
          >
            Discover Events
          </li>
          <div className="flex items-center space-x-4">
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Register
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}
