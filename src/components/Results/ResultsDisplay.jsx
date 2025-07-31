import React from 'react';
import FlightCard from './FlightCard';
import Filters from './Filters';

const ResultsDisplay = ({ flights, loading, error, filters, setFilters }) => {
  if (loading) {
    return <div className="w-full mt-8 text-center text-gray-300">Searching for the best flights...</div>;
  }

  if (error) {
    return <div className="w-full mt-8 text-center text-red-400">{error}</div>;
  }
  
  // Render filters section even if there are no flights, but only if a search has been attempted.
  const hasSearched = flights || error;

  return (
    <>
      {hasSearched &&
        <div className="w-full lg:w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      }
      <div className="w-full lg:w-3/4">
        {flights && flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          !loading && <div className="text-center text-gray-400">No flights found. Please start a new search.</div>
        )}
      </div>
    </>
  );
};

export default ResultsDisplay;
