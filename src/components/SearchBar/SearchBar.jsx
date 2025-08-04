import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// --- SVG Icons for a cleaner look ---
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400 mr-2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const LocationPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400 mr-2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
    </svg>
);


const SearchBar = ({ 
    onSearch, 
    flightLegs, 
    handleUpdateLeg, 
    handleAddLeg, 
    handleRemoveLeg 
}) => {
  // --- State Management ---
  const [tripType, setTripType] = useState('roundtrip');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  
  const handleSearchClick = () => {
    let searchParams = {
        tripType,
        passengers,
        cabinClass,
    };
    if (tripType === 'multicity') {
        searchParams.flightLegs = flightLegs;
    } else {
        searchParams.departureAirport = flightLegs[0].origin;
        searchParams.destinationAirport = flightLegs[0].destination;
        searchParams.departureDate = departureDate;
        searchParams.returnDate = tripType === 'roundtrip' ? returnDate : null;
    }
    onSearch(searchParams);
  };

  // --- Render ---
  return (
    <div className="p-6 bg-white dark:bg-[#303134] rounded-xl shadow-lg w-full max-w-5xl mx-auto font-sans">
      <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-800 dark:text-white">
        <select value={tripType} onChange={(e) => setTripType(e.target.value)} className="bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="roundtrip" className="bg-white dark:bg-gray-700">Round trip</option>
          <option value="one-way" className="bg-white dark:bg-gray-700">One-way</option>
          <option value="multicity" className="bg-white dark:bg-gray-700">Multi-city</option>
        </select>
        <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {[...Array(8).keys()].map(i => <option key={i+1} value={i+1} className="bg-white dark:bg-gray-700">{i+1} passenger{i > 0 && 's'}</option>)}
        </select>
        <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} className="bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="economy" className="bg-white dark:bg-gray-700">Economy</option>
          <option value="business" className="bg-white dark:bg-gray-700">Business</option>
          <option value="first" className="bg-white dark:bg-gray-700">First</option>
        </select>
      </div>

      {tripType === 'multicity' ? (
        <div>
            {flightLegs.map((leg, index) => (
              <div key={leg.id} className="flex flex-col md:flex-row items-center gap-2 mb-2">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 bg-gray-100 dark:bg-[#3c4043] rounded-lg border border-gray-300 dark:border-gray-500 w-full">
                  <div className="relative flex items-center border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-500 p-2.5">
                      <LocationPinIcon />
                      <LocationInput
                          placeholder="Where from?"
                          onAirportSelect={(airport) => handleUpdateLeg(index, 'origin', airport)}
                          airport={leg.origin}
                      />
                  </div>
                  <div className="relative flex items-center p-2.5">
                      <LocationPinIcon />
                      <LocationInput
                          placeholder="Where to?"
                          onAirportSelect={(airport) => handleUpdateLeg(index, 'destination', airport)}
                          airport={leg.destination}
                      />
                  </div>
                </div>
                
                <div className="flex-1 md:flex-grow-0 bg-gray-100 dark:bg-[#3c4043] rounded-lg border border-gray-300 dark:border-gray-500 w-full md:w-auto">
                   <div className="relative flex items-center p-2.5">
                        <CalendarIcon />
                        <DatePicker
                          selected={leg.date}
                          onChange={(date) => handleUpdateLeg(index, 'date', date)}
                          className="bg-transparent text-gray-800 dark:text-white w-full focus:outline-none"
                          dateFormat="E, MMM d"
                       />
                   </div>
                </div>

                {flightLegs.length > 2 && (
                    <button onClick={() => handleRemoveLeg(index)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                        ✕
                    </button>
                )}
              </div>
            ))}
            <div className="mt-4 flex gap-4">
                <button
                  onClick={handleAddLeg}
                  className="px-4 py-2 text-white bg-gray-500 dark:bg-gray-600 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700"
                >
                  Add flight
                </button>
                <button
                  onClick={handleSearchClick}
                  className="w-full md:w-auto px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Search
                </button>
            </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-stretch gap-2">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 bg-gray-100 dark:bg-[#3c4043] rounded-lg border border-gray-300 dark:border-gray-500 w-full">
                <div className="relative flex items-center border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-500 p-2.5">
                    <LocationPinIcon />
                    <LocationInput
                        placeholder="Where from?"
                        onAirportSelect={(airport) => handleUpdateLeg(0, 'origin', airport)}
                        airport={flightLegs[0].origin}
                    />
                </div>
                 <div className="relative flex items-center p-2.5">
                    <LocationPinIcon />
                    <LocationInput
                        placeholder="Where to?"
                        onAirportSelect={(airport) => handleUpdateLeg(0, 'destination', airport)}
                        airport={flightLegs[0].destination}
                    />
                </div>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 bg-gray-100 dark:bg-[#3c4043] rounded-lg border border-gray-300 dark:border-gray-500 w-full">
                <div className="relative flex items-center border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-500 p-2.5">
                    <CalendarIcon />
                    <DatePicker
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        selectsStart
                        startDate={departureDate}
                        endDate={returnDate}
                        minDate={new Date()}
                        className="bg-transparent text-gray-800 dark:text-white w-full focus:outline-none"
                        dateFormat="E, MMM d"
                    />
                </div>
                 <div className={`relative flex items-center p-2.5 ${tripType === 'one-way' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <CalendarIcon />
                    <DatePicker
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        selectsEnd
                        startDate={departureDate}
                        endDate={returnDate}
                        minDate={departureDate}
                        disabled={tripType === 'one-way'}
                        className="bg-transparent text-gray-800 dark:text-white w-full focus:outline-none"
                        dateFormat="E, MMM d"
                    />
                </div>
            </div>
            <button
              onClick={handleSearchClick}
              className="w-full lg:w-auto px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Search
            </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
