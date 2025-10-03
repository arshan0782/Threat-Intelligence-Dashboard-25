import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Skills array for progress bars (data remains the same)
const skills = [
  { name: "IP Detection", level: 80 },
  { name: "URL Detection", level: 70 },
  { name: "Domain Analysis", level: 60 },
  { name: "Threat Intelligence", level: 90 },
];


// Color classes for progress bars (light and dark mode)
const lightColors = ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600"];
const darkColors = ["bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-red-400"];

// Progress component displays animated skill bars
const Progress = ({ darkMode }) => {
  
  const barBg = darkMode ? "bg-gray-700" : "bg-gray-300";
  const colors = darkMode ? darkColors : lightColors;

  // Ref and in-view detection for animation trigger
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    // Main container for progress bars
    <div
      ref={ref}
      className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Progress Detection</h2>
      <div className="space-y-6">
        {/* Render each skill's progress bar */}
        {skills.map((skill, index) => (
        
          <div key={index}>
            {/* Skill name and percentage */}
            <div className="flex justify-between mb-2 text-sm font-medium">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            {/* Progress bar background */}
            <div className={`w-full h-3 rounded-full ${barBg} overflow-hidden`}>
              {/* Animated progress bar */}
              <motion.div
                className={`h-3 rounded-full ${colors[index % colors.length]}`}
                initial={{ width: 0 }}
                // Animate based on whether the component is in view
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;