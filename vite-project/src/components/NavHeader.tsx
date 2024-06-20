import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-0 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-gray-800"></a>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <nav
        className={`md:flex justify-center items-center ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="md:flex space-x-6">
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <ul>
              <li>{<NavLink to="/">Home </NavLink>}</li>
            </ul>
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <ul>
              <li>{<NavLink to="/deltager">Deltager Oversigt </NavLink>}</li>
              <li>{<NavLink to="hotel">Hotel</NavLink>}</li>
            </ul>
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Services
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
