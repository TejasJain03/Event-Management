import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-darkBlue h-20 sticky text-white top-0 z-10 w-full">
        <ul className="flex justify-between items-center h-full mx-4 sm:mx-10">
          <li
            onClick={() => {
              navigate("/");
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer"
          >
            EventEase
          </li>
          <li
            className="cursor-pointer text-base sm:text-lg font-medium"
            onClick={() => {
              navigate("/showallevent");
            }}
          >
            Discover Events
          </li>
          <div className="flex items-center space-x-4">
            <li
              className="cursor-pointer text-base sm:text-lg font-medium"
              onClick={() => {
                navigate("/login");
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAP9JREFUSEvFlOsNwjAMhO82gUmgm8AkwCSwCd2EMonRSU3VpmkcGir8q1Kj++zzg9g4uLE+igBmtgNwAXAC0AFoAdxI6jsbLsDMjgCeCRWJn0kKthglgBcAVZCKjuR+NcDMZMndcaHJVZGtwMyuvfc5hnqhd8nwAEv+j8XUh8dagLxXg7fpgbLKTJF+Z/3XA3eKekjYA1mmCCNavwfeInn/iyrwRGr2QON3ABCsGWuFk/H+ekz7xmrBlqYnTnrxbMwscqbGc2s2VSlA7vZ4gNltmgAKT4MHmZyOGCDfdeBqoiXZBIEYUGNP0JzYFAOsJvUha3LQ/e+i/aSaX4jkND45MFsZqs//kwAAAABJRU5ErkJggg==" />
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}
