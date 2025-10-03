import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaUserCircle, FaBell } from "react-icons/fa";



// Header component with dark mode toggle and animated title
const Header = ({
  darkMode,
  toggleDarkMode,
  hasNotifications = true, // Default prop is still set here
}) => {

  // Text to display with typing animation
  const fullText = "Threat Intelligence Dashboard";
  const [displayedText, setDisplayedText] = useState("");

  // Typing and deleting animation effect for header text
  useEffect(() => {
    let currentIndex = 0;
    let deleting = false;

    // Interval for typing/deleting animation
    const interval = setInterval(() => {
      setDisplayedText(
        deleting
          ? fullText.substring(0, currentIndex--)
          : fullText.substring(0, currentIndex++)
      );

      // Switch between typing and deleting
      if (!deleting && currentIndex === fullText.length) {
        deleting = true;
        currentIndex = fullText.length;
      } else if (deleting && currentIndex === 0) {
        deleting = false;
        currentIndex = 0;
      }
    }, 100);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Common button styles
  const buttonBase =
    "p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <header className="flex justify-between items-center mb-8">
      {/* Animated header text */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        {displayedText}
        <span className="animate-pulse">|</span>
      </h1>

      
      <div className="flex items-center gap-6">
        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className={`${buttonBase} ${
            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
          }`}
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" size={24} />
          ) : (
            <FaMoon className="text-gray-600" size={24} />
          )}
        </button>

        {/* Notifications button with indicator */}
        <button
          aria-label="Notifications"
          className={`${buttonBase} ${
            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
          } relative`}
        >
          <FaBell size={24} />
          {hasNotifications && (
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>

        {/* User profile button */}
        <button
          aria-label="User Profile"
          className={`${buttonBase} ${
            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
          }`}
        >
          <FaUserCircle size={28} />
        </button>
      </div>
    </header>
  );
};

export default Header;