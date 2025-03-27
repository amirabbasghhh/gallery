// Skeletons.tsx
import React from "react";

const Skeletons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="w-[220px] h-[400px]  rounded-lg bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-pulse"
        />
      ))}
    </div>
  );
};

export default Skeletons;
