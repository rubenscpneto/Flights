import React, { useState } from 'react';
import { SignedIn, useUser } from '@clerk/clerk-react';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import FlightCard from './FlightCard';
import Filters from './Filters';
import SortControls from './SortControls';
import FlightCardSkeleton from './FlightCardSkeleton';
import EmptyState from './EmptyState';
import FlightDetailModal from './FlightDetailModal';


const ResultsDisplay = ({ flights, loading, error, filters, setFilters, sortBy, setSortBy, searchParams }) => {
  const { user } = useUser();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const hasSearched = flights || error || loading;
  const noResults = !loading && hasSearched && flights && flights.length === 0;

  const handleSaveSearch = async () => {
    if (!user || !searchParams) return;
    
    // Ensure searchParams has the necessary data for saving
    const { departureAirport, destinationAirport, departureDate, returnDate } = searchParams;

    const { data, error } = await supabase
      .from('saved_searches')
      .insert({ 
          user_id: user.id, 
          origin_name: departureAirport?.presentation?.suggestionTitle,
          destination_name: destinationAirport?.presentation?.suggestionTitle,
          origin_id: departureAirport?.skyId,
          destination_id: destinationAirport?.skyId,
          departure_date: departureDate?.toISOString().split('T')[0],
          return_date: returnDate ? returnDate.toISOString().split('T')[0] : null,
      });

    if (error) {
        console.error('Error saving search:', error);
        alert('Could not save search.');
    } else {
        alert('Search saved!');
    }
  };
  
  const listVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <>
      {hasSearched &&
        <div className="w-full lg:w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      }
      <div className="w-full lg:w-3/4">
        <div className="flex justify-between items-center">
            {hasSearched && !noResults && <SortControls sortBy={sortBy} setSortBy={setSortBy} />}
            <SignedIn>
                {hasSearched && !noResults &&
                    <button onClick={handleSaveSearch} className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                        Save Search
                    </button>
                }
            </SignedIn>
        </div>
        
        {loading && (
            <div>
                {[...Array(5)].map((_, i) => <FlightCardSkeleton key={i} />)}
            </div>
        )}

        {error && <div className="w-full mt-8 text-center text-red-400">{error}</div>}

        {!loading && !error && flights && flights.length > 0 && (
          <motion.div
            className="flex flex-col gap-4"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {flights.map((flight) => (
              <FlightCard 
                key={flight.id} 
                flight={flight}
                onSelect={() => setSelectedFlight(flight)}
              />
            ))}
          </motion.div>
        )}
        
        {noResults && <EmptyState />}
      </div>
      
      {selectedFlight && (
        <FlightDetailModal
          flight={selectedFlight}
          isOpen={!!selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </>
  );
};

export default ResultsDisplay;
