import React from "react";

interface LoadingAnimationProps {
  darkMode: boolean;
  loading: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ darkMode, loading }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <style jsx>{`
        @keyframes pulse-1 {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes pulse-2 {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .loading-pulse {
          width: 80px;
          height: 80px;
          position: relative;
        }
        .loading-pulse::before,
        .loading-pulse::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px solid #ff0000;
          animation: pulse-1 2s infinite ease-out;
        }
        .loading-pulse::after {
          animation-delay: 1s;
          border-color: #ff8000;
        }
        .loading-text {
          color: #ff4500;
          font-weight: bold;
          text-shadow: 0 0 10px #ff4500;
        }
      `}</style>

      <div className="loading-pulse"></div>
      <p className="mt-8 text-2xl font-bold loading-text">
        {loading ? "डेटा लोड हो रहा है..." : "प्रमाणीकरण लोड हो रहा है..."}
      </p>
    </div>
  );
};

export default LoadingAnimation;
