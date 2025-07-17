import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { BsPerson, BsBoxArrowRight } from "react-icons/bs";
import { AuthContext } from "../common/context/Authprovider";

function Navbar() {
  const { setUser, logout, user, cartCount } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  if (isAuthPage) return null;

  const isScrollEffectPage =
    location.pathname === "/" || location.pathname === "/products";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfile = () => {
    if (!user) navigate("/login");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isScrollEffectPage) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollEffectPage]);

  const navbarClasses = isScrollEffectPage
    ? `fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-sm border-gray-100 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`
    : "fixed w-full top-0 z-50 bg-white py-4 shadow-sm";

  const iconColor = isScrollEffectPage
    ? isScrolled
      ? "text-black"
      : "text-white"
    : "text-black";

  const linkStyle = `text-sm uppercase tracking-wider transition duration-300 font-light ${iconColor} hover:text-gold-500`;

  return (
    <nav className={navbarClasses}>
  <div className="flex justify-between items-center px-6 lg:px-12 relative">
    {/* Mobile Menu Toggle - Thinner icons */}
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className={`lg:hidden ${iconColor}`}
    >
      {isMenuOpen ? (
        <FaTimes className="text-xl !font-thin" /> 
      ) : (
        <FaBars className="text-xl !font-thin" />
      )}
    </button>

    {/* Logo remains unchanged */}
    <Link
      to="/"
      className={`text-2xl lg:text-3xl font-serif italic tracking-wider lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 ${iconColor}`}
    >
      HOROLOGIE
    </Link>

    {/* Desktop Navigation unchanged */}
    <ul className="hidden lg:flex items-center space-x-8">
      <li>
        <Link to="/products" className={linkStyle}>
          Collections
        </Link>
      </li>
    </ul>

    {/* Icons section with ultra-thin styling */}
    <ul className="flex items-center space-x-4 lg:space-x-6">
      {/* Search icon - ultra thin */}
      <li className="hidden lg:block">
        <Link to="/search">
          <FaSearch className={`text-lg ${iconColor} !font-thin`} />
        </Link>
      </li>

      {/* Wishlist icon - ultra thin */}
      <li className="relative hidden lg:block">
        <Link to="/wishlist">
          <FaHeart className={`text-lg ${iconColor} !font-thin`} />
          <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-light">
            2
          </span>
        </Link>
      </li>

      {/* Cart icon - ultra thin */}
      <li className="relative">
        <Link to="/cart">
          <FaShoppingCart className={`text-xl ${iconColor} !font-thin`} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 backdrop-blur-sm bg-white/30 text-black text-[11px] rounded-full px-1.5 font-medium shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </li>

      {/* Profile section with bold username */}
      <li className="relative" ref={dropdownRef}>
        {user ? (
          <div
            onClick={toggleDropdown}
            className={`text-base lg:text-lg font-bold px-2 cursor-pointer ${iconColor}`} 
          >
            {user.name}
          </div>
        ) : (
          <Link to="/login" onClick={handleProfile}>
            <BsPerson className={`text-lg ${iconColor} !font-thin`} /> {/* Ultra thin */}
          </Link>
        )}

        {dropdownOpen && user && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md z-50">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            >
              <BsBoxArrowRight className="mr-2 !font-thin" /> {/* Ultra thin */}
              Logout
            </button>
          </div>
        )}
      </li>
    </ul>
  </div>

  {/* Mobile Menu with thin icons */}
  {isMenuOpen && (
    <div
      className={`lg:hidden fixed top-[72px] inset-x-0 z-40 p-6 space-y-4 ${
        isScrollEffectPage && !isScrolled
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <Link
        to="/products"
        onClick={() => setIsMenuOpen(false)}
        className="block border-b pb-3 uppercase text-sm tracking-wider"
      >
        Collections
      </Link>
      <Link
        to="/heritage"
        onClick={() => setIsMenuOpen(false)}
        className="block border-b pb-3 uppercase text-sm tracking-wider"
      >
        Our Heritage
      </Link>
      <Link
        to="/search"
        onClick={() => setIsMenuOpen(false)}
        className="block border-b pb-3 uppercase text-sm tracking-wider"
      >
        Search
      </Link>
      {user ? (
        <button
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 pt-3 text-sm uppercase"
        >
          <BsBoxArrowRight className="!font-thin" /> {/* Ultra thin */}
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          onClick={() => setIsMenuOpen(false)}
          className="block pt-3 text-sm uppercase"
        >
          <BsPerson className="inline mr-2 !font-thin" /> {/* Ultra thin */}
          Login
        </Link>
      )}
    </div>
  )}
</nav>
  );
}

export default Navbar;
