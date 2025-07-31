import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleStopsChange = (stopValue) => {
    const currentStops = filters.stops;
    const newStops = currentStops.includes(stopValue)
      ? currentStops.filter(s => s !== stopValue) // Remove if already present
      : [...currentStops, stopValue]; // Add if not present

    setFilters({ ...filters, stops: newStops });
  };

  return (
    <div className="p-4 bg-[#303134] rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-bold text-gray-100">Filters</h3>
      <div>
        <h4 className="mb-2 font-semibold text-gray-200">Stops</h4>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="non-stop" 
            className="mr-2 h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
            checked={filters.stops.includes(0)}
            onChange={() => handleStopsChange(0)}
          />
          <label htmlFor="non-stop" className="text-gray-300">Non-stop</label>
        </div>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="1-stop" 
            className="mr-2 h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-offset-gray-800" 
            checked={filters.stops.includes(1)}
            onChange={() => handleStopsChange(1)}
          />
          <label htmlFor="1-stop" className="text-gray-300">1 stop</label>
        </div>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="2-stops" 
            className="mr-2 h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-offset-gray-800" 
            checked={filters.stops.includes(2)}
            onChange={() => handleStopsChange(2)}
          />
          <label htmlFor="2-stops" className="text-gray-300">2+ stops</label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
