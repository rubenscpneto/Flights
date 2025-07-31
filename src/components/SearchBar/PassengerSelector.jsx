import React from 'react';

const PassengerSelector = ({ value, onChange }) => {
  return (
    <select 
      value={value} 
      onChange={onChange} 
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="1">1 Adult</option>
      <option value="2">2 Adults</option>
      <option value="3">3 Adults</option>
      <option value="4">4 Adults</option>
      <option value="5">5 Adults</option>
    </select>
  );
};

export default PassengerSelector;
