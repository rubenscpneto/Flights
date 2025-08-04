import React from 'react';

const SortControls = ({ sortBy, setSortBy }) => {
  const commonButtonStyles = "px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto";
  const selectedStyles = "bg-blue-600 text-white";
  const unselectedStyles = "bg-gray-600 text-gray-300 hover:bg-gray-500";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-[#3c4043] rounded-lg mb-4">
      <button
        onClick={() => setSortBy('price')}
        className={`${commonButtonStyles} ${sortBy === 'price' ? selectedStyles : unselectedStyles}`}
      >
        Cheapest
      </button>
      <button
        onClick={() => setSortBy('duration')}
        className={`${commonButtonStyles} ${sortBy === 'duration' ? selectedStyles : unselectedStyles}`}
      >
        Fastest
      </button>
    </div>
  );
};

export default SortControls;
