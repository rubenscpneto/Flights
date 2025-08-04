import React from 'react';
import FlightCard from './FlightCard';
import Filters from './Filters';
import SortControls from './SortControls';
import FlightCardSkeleton from './FlightCardSkeleton';
import EmptyState from './EmptyState';

const ResultsDisplay = ({ flights, loading, error, filters, setFilters, sortBy, setSortBy }) => {
  const hasSearched = flights || error || loading;
  const noResults = !loading && hasSearched && flights && flights.length === 0;

  return (
    <>
      {hasSearched &&
        <div className="w-full lg:w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      }
      <div className="w-full lg:w-3/4">
        {hasSearched && !noResults && <SortControls sortBy={sortBy} setSortBy={setSortBy} />}
        
        {loading && (
            <div>
                {[...Array(5)].map((_, i) => <FlightCardSkeleton key={i} />)}
            </div>
        )}

        {error && <div className="w-full mt-8 text-center text-red-400">{error}</div>}

        {!loading && !error && flights && flights.length > 0 && (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        )}
        
        {noResults && <EmptyState />}
      </div>
    </>
  );
};

export default ResultsDisplay;
