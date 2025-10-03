import React from "react";

const Sidebar = ({ darkMode }) => {
  return (
    <aside
      className={`w- p-6 border-r ${
        darkMode ? "border-gray-700" : "border-gray-300"
      } hidden md:block`}
    >
      <h2 className="text-2xl font-bold mb-8">T I D</h2>
      <nav className="flex flex-col gap-4 text-sm">
        <a href="#" className="hover:text-blue-500">
          Dashboard
        </a>
        <a href="#" className="hover:text-blue-500">
          Reports
        </a>
        <a href="#" className="hover:text-blue-500">
          Settings
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
