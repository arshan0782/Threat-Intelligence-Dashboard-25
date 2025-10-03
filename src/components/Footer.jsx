import React from "react";
import { FaGithub, FaFileAlt, FaEnvelope } from "react-icons/fa";


const Footer = ({ darkMode }) => {
  return (
    // Footer container with dynamic theme classes
    <footer
      className={`py-6 mt-12 border-t px-4 ${
        darkMode
          ? "bg-gray-900 text-gray-300 border-gray-700"
          : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Securifide Advisory Assignment. Designed & Built By{" "}
          <strong>Mohd Arshan</strong>
        </p>

        <div className="flex gap-4">
          {/* GitHub link */}
          <a
            href="https://github.com/arshan0782"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition"
            aria-label="GitHub Repository"
          >
            <FaGithub size={20} />
          </a>

          {/* Documentation link */}
          <a
            href="example.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition"
            aria-label="Documentation"
          >
            <FaFileAlt size={20} />
          </a>
  
          {/* Email link */}
          <a
            href="mailto:arshan0782@gmail.com"
            className="hover:text-gray-900 dark:hover:text-white transition"
            aria-label="Contact Email"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        Made with ❤️ using React.js & Tailwind CSS
      </div>
    </footer>
  );
};

export default Footer;