import React, { useState, useEffect } from 'react';
import { searchAirports } from '../../api/skyScrapper.mock';

const LocationInput = ({ placeholder, onAirportSelect, airport }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    if (airport && airport.presentation) {
      setQuery(airport.presentation.suggestionTitle);
    } else {
      setQuery('');
    }
  }, [airport]);

  useEffect(() => {
    if (query.length < 2 || (airport && query === airport.presentation.suggestionTitle)) {
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      searchAirports(query)
        .then(response => {
          if (response.data && Array.isArray(response.data.data)) {
            setSuggestions(response.data.data);
          } else {
            setSuggestions([]);
          }
        })
        .catch(error => {
          console.error('Error fetching airport suggestions:', error);
          setSuggestions([]);
        });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, airport]);

  const handleSelect = (selectedAirport) => {
    onAirportSelect(selectedAirport);
    setQuery(selectedAirport.presentation.suggestionTitle);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent text-gray-800 dark:text-white w-full focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-20 w-full mt-2 bg-white dark:bg-[#3c4043] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.skyId}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <div className="font-semibold">{suggestion.presentation.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{suggestion.presentation.subtitle}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
