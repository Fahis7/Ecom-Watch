import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

const NavbarBlack = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black py-4 px-6 lg:px-12 shadow-md z-50 relative opacity-85">
      <div className="flex justify-between items-center">
        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-white text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl lg:text-3xl font-serif italic tracking-wider text-white lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
        >
          HOROLOGIE
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8">
          <li>
            <Link
              to="/products"
              className="text-sm text-white uppercase tracking-wider hover:text-gold-500 transition"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-sm text-white uppercase tracking-wider hover:text-gold-500 transition"
            >
              Our Heritage
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/search" className="text-white hover:text-gold-500 transition">
              <FaSearch />
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gold-500 transition">
              <BsPerson />
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="text-white hover:text-gold-500 transition relative">
              <FaHeart />
              <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-white hover:text-gold-500 transition relative">
              <FaShoppingCart />
              <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                5
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-black text-white py-6 px-4 space-y-4 border-t border-gray-700">
          <Link
            to="/products"
            className="block uppercase tracking-wide text-sm hover:text-gold-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/"
            className="block uppercase tracking-wide text-sm hover:text-gold-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Heritage
          </Link>
          <Link
            to="/login"
            className="block uppercase tracking-wide text-sm hover:text-gold-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block uppercase tracking-wide text-sm hover:text-gold-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarBlack;
