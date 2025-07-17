import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { AuthContext } from "../common/context/Authprovider";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-sm border-gray-100 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 lg:px-12">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>

        {/* Logo - Left aligned on mobile, centered on desktop */}
        <Link
          to="/"
          className={`text-2xl lg:text-3xl font-serif italic tracking-wider ${
            isScrolled ? "text-black" : "text-white"
          } lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2`}
        >
          HOROLOGIE
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          <li>
            <Link
              to="/products"
              className={`text-sm uppercase tracking-wider transition duration-300 font-light ${
                isScrolled
                  ? "text-gray-700 hover:text-gold-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Collections
            </Link>
          </li>
        </ul>

        {/* Right Navigation Icons */}
        <ul className="flex items-center space-x-6 lg:space-x-8">
          <li className="hidden lg:block">
            <Link
              to="/search"
              className={`text-sm transition duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-gold-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <FaSearch className="text-lg" />
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link
              to="/login
      s,"
              className={`text-sm transition duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-gold-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <BsPerson className="text-lg" />
            </Link>
          </li>
          <li className="relative">
            <Link
             
              className={`text-sm transition duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-gold-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <FaHeart
                className="text-lg"
                onClick={() => {
                  logout();
                  alert("logged out")
                }}
              />
              <span
                className={`absolute -top-2 -right-2 ${
                  isScrolled
                    ? "bg-gold-500 text-black"
                    : "bg-white/90 text-black"
                } text-xs w-5 h-5 flex items-center justify-center rounded-full font-light`}
              >
                2
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/cart"
              className={`text-sm transition duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-gold-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <FaShoppingCart className="text-lg" />
              <span
                className={`absolute -top-2 -right-2 ${
                  isScrolled
                    ? "bg-gold-500 text-black"
                    : "bg-white/90 text-black"
                } text-xs w-5 h-5 flex items-center justify-center rounded-full font-light`}
              >
                5
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-40 mt-16 pt-8 px-6 ${
            isScrolled ? "bg-white" : "bg-black/95 backdrop-blur-sm"
          }`}
        >
          <ul className="space-y-6">
            <li>
              <Link
                to="/collections"
                className={`block py-3 border-b ${
                  isScrolled
                    ? "border-gray-100 text-gray-700"
                    : "border-white/20 text-white"
                } uppercase tracking-wider text-sm`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                to="/heritage"
                className={`block py-3 border-b ${
                  isScrolled
                    ? "border-gray-100 text-gray-700"
                    : "border-white/20 text-white"
                } uppercase tracking-wider text-sm`}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Heritage
              </Link>
            </li>
            <li>
              <Link
                to="/craftsmanship"
                className={`block py-3 border-b ${
                  isScrolled
                    ? "border-gray-100 text-gray-700"
                    : "border-white/20 text-white"
                } uppercase tracking-wider text-sm`}
                onClick={() => setIsMenuOpen(false)}
              >
                Craftsmanship
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={`block py-3 border-b ${
                  isScrolled
                    ? "border-gray-100 text-gray-700"
                    : "border-white/20 text-white"
                } uppercase tracking-wider text-sm`}
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className={`block py-3 border-b ${
                  isScrolled
                    ? "border-gray-100 text-gray-700"
                    : "border-white/20 text-white"
                } uppercase tracking-wider text-sm`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
