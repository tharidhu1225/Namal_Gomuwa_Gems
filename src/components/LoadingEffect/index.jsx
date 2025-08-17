import React from "react";
import { FaGem } from "react-icons/fa"; // Make sure react-icons is installed

const GemLoader = () => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-3">
        <div className="animate-spin-slow w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-300/30">
          <FaGem className="text-white text-3xl" />
        </div>
        <p className="text-sm text-gray-500 font-medium">Loading Please Wait...</p>
      </div>
    </div>
  );
};

export default GemLoader;
