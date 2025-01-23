import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice.js";
import gsap from "gsap";

const Navbar = ({ theme }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Added navigate hook
  const dropdownRef = useRef(null);

  const newTab = new URLSearchParams(location.search);
  newTab.set("tab", "profile");

  const newLocation = `${location.pathname}?${newTab.toString()}`;

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/"); // Navigate to the homepage after sign out
  };

  const handleProfileClick = () => {
    navigate("/dashboard"); // Navigate directly to the profile tab in the dashboard
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-3xl font-bold tracking-wide">
        DRDO
      </Link>

      <div className="flex items-center space-x-4">
        {/* Direct Profile Link */}
        <button
          onClick={handleProfileClick}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-700"
        >
          {currentUser?.name || "Profile"}
        </button>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-700"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
