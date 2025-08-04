import React from 'react';

const FlightCardSkeleton = () => (
  <div className="p-4 mb-4 bg-[#3c4043] rounded-lg shadow-md animate-pulse">
    <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center w-full sm:w-1/4">
            <div className="w-10 h-10 bg-gray-500 rounded-full mr-4"></div>
            <div className="h-4 w-24 bg-gray-500 rounded"></div>
        </div>
        <div className="flex justify-around w-full sm:w-2/4">
            <div className="h-4 w-16 bg-gray-500 rounded"></div>
            <div className="h-4 w-16 bg-gray-500 rounded"></div>
            <div className="h-4 w-16 bg-gray-500 rounded"></div>
        </div>
        <div className="w-full sm:w-1/4 flex flex-col items-end gap-2">
            <div className="h-6 w-20 bg-gray-500 rounded"></div>
            <div className="h-8 w-24 bg-gray-500 rounded"></div>
        </div>
    </div>
  </div>
);

export default FlightCardSkeleton;
