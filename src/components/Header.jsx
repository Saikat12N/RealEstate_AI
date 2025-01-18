import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-8xl mx-auto p-3">
        {/* Logo */}
        <h1 className="font-bold text-2xl sm:text-3xl flex flex-wrap">
          <span className="text-orange-400">Real</span>
          <span className="text-green-800">Estate</span>
        </h1>

        {/* Search Bar */}
        <form className="bg-slate-100 p-2 rounded-lg flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent outline-none px-2 w-44 sm:w-64"
          />
          <FaSearch className="text-slate-600 cursor-pointer" />
        </form>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex p-2 gap-6 text-lg font-medium">
          <li>
            <Link to="/home" className="hover:text-orange-600">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-600">About</Link>
          </li>
          <li>
            <Link to="/signin" className="hover:text-orange-600">Sign-In</Link>
          </li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden cursor-pointer text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center bg-slate-100 py-4 space-y-4">
          <li>
            <Link to="/home" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/signin" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Sign-In</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
