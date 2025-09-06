import React from "react";
import {
  FaSearch,
  FaBars,
  FaShoppingCart,
  FaPlusCircle,
  FaSlidersH,
  FaTree,
  FaRulerVertical,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaUser,
} from "react-icons/fa";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to='/' className="text-2xl font-bold text-red-600">JAMIFY</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/electric-guitars" className="text-gray-700 hover:text-red-600 transition">
              Electric Guitars
            </Link>
           <Link to="/acoustic-guitars" className="text-gray-700 hover:text-red-600 transition">
              Acoustic Guitars
            </Link>
           <Link to="/basses" className="text-gray-700 hover:text-red-600 transition">
              Basses
            </Link>
           <Link to="/learn" className="text-gray-700 hover:text-red-600 transition">
              Learn
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-red-600 transition">
            <FaSearch />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600 transition">
            <FaShoppingCart />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600 transition">
            <FaUser />
          </button>
          <button className="md:hidden p-2 text-gray-600 hover:text-red-600 transition">
            <FaBars />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
