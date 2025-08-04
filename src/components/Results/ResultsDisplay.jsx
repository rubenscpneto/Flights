import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import FlightCard from './FlightCard';
import Filters from './Filters';
import SortControls from './SortControls';
import FlightCardSkeleton from './FlightCardSkeleton';
import EmptyState from './EmptyState';
import FlightDetailModal from './FlightDetailModal';


const ResultsDisplay = ({ flights, loading, error, filters, setFilters, sortBy, setSortBy, searchParams }) => {
  const { user, session } = useAuth(); // Use the new hook
  const [selectedFlight, setSelectedFlight] = useState(null);
  const hasSearched = flights || error || loading;
  const noResults = !loading && hasSearched && flights && flights.length === 0;

  const handleSaveSearch = async () => {
    if (!user) {
      alert('You must be signed in to save a search.');
      return;
    }
    if (!searchParams) {
      alert('Cannot save search, please perform a search first.');
      return;
    }

    // Data Extraction Logic
    let searchToSave = {};
    if (searchParams.tripType === 'multicity') {
      const firstLeg = searchParams.legs?.[0];
      searchToSave = {
        origin_name: firstLeg?.origin?.presentation?.suggestionTitle,
        destination_name: firstLeg?.destination?.presentation?.suggestionTitle,
        origin_id: firstLeg?.origin?.skyId,
        destination_id: firstLeg?.destination?.skyId,
        departure_date: firstLeg?.date,
      };
    } else {
      searchToSave = {
        origin_name: searchParams.departureAirport?.presentation?.suggestionTitle,
        destination_name: searchParams.destinationAirport?.presentation?.suggestionTitle,
        origin_id: searchParams.departureAirport?.skyId,
        destination_id: searchParams.destinationAirport?.skyId,
        departure_date: searchParams.departureDate,
      };
    }

    if (!searchToSave.origin_name || !searchToSave.destination_name || !searchToSave.departure_date) {
      alert('Could not save search. Please ensure origin, destination, and date are selected.');
      return;
    }

    const { data, error } = await supabase
      .from('saved_searches')
      .insert({
        user_id: user.id, // This will now be a UUID
        ...searchToSave,
      });

    if (error) {
      console.error('Error saving search to Supabase:', error);
      alert(`Failed to save search: ${error.message}`);
    } else {
      alert('Search saved successfully!');
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
            {session && hasSearched && !noResults &&
                <button onClick={handleSaveSearch} className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                    Save Search
                </button>
            }
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
