import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressProps {
  darkMode: boolean;
}

const skills = [
  { name: "IP Detection", level: 80 },
  { name: "URL Detection", level: 70 },
  { name: "Domain Analysis", level: 60 },
  { name: "Threat Intelligence", level: 90 },
];

// ✅ Different colors for each progress bar
const lightColors = ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600"];
const darkColors = ["bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-red-400"];

const Progress: React.FC<ProgressProps> = ({ darkMode }) => {
  const barBg = darkMode ? "bg-gray-700" : "bg-gray-300";
  const colors = darkMode ? darkColors : lightColors;

  // ref for scroll trigger
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <h2 className="text-2xl font-bold mb-6">Progress Overview</h2>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2 text-sm font-medium">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className={`w-full h-3 rounded-full ${barBg} overflow-hidden`}>
              <motion.div
                className={`h-3 rounded-full ${colors[index % colors.length]}`}
                initial={{ width: 0 }}
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
