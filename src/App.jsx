import React, { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsDisplay from './components/Results/ResultsDisplay';
import { searchFlights } from './api/skyScrapper.mock';
import './App.css';

function App() {
  const [flightResults, setFlightResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    stops: [] // e.g., [0, 1] for "Non-stop" and "1 stop"
  });
  
  const [flightLegs, setFlightLegs] = useState([
    { id: 1, origin: null, destination: null, date: new Date() },
    { id: 2, origin: null, destination: null, date: new Date(new Date().setDate(new Date().getDate() + 7)) },
  ]);

  const handleUpdateLeg = (index, field, value) => {
    const newLegs = [...flightLegs];
    newLegs[index][field] = value;
    setFlightLegs(newLegs);
  };

  const handleAddLeg = () => {
    setFlightLegs([
      ...flightLegs,
      { id: Date.now(), origin: null, destination: null, date: new Date() }
    ]);
  };

  const handleRemoveLeg = (index) => {
    // Prevent removing if only two legs are left
    if (flightLegs.length <= 2) return; 
    const newLegs = flightLegs.filter((_, i) => i !== index);
    setFlightLegs(newLegs);
  };

  const handleFlightSearch = async (searchParams) => {
    if (searchParams.tripType !== 'multicity') {
        if (!searchParams.departureAirport || !searchParams.destinationAirport) {
            setError('Please select both a departure and destination airport.');
            return;
        }
    } else {
        for(const leg of flightLegs) {
            if(!leg.origin || !leg.destination) {
                setError('Please fill all origin and destination fields for multi-city search.');
                return;
            }
        }
    }

    setIsLoading(true);
    setError('');
    setFlightResults([]);

    try {
        if (searchParams.tripType === 'multicity') {
            // Placeholder for multi-city API calls
            console.log("Searching for multi-city flights with these legs:", searchParams.flightLegs);
            // In a real app, you would loop through each leg and make a separate API call.
            // For now, we'll just use the first leg to get some mock data.
            const response = await searchFlights(searchParams.flightLegs[0]);
            setFlightResults(response.data.data);
        } else {
            const response = await searchFlights(searchParams);
            setFlightResults(response.data.data);
        }
    } catch (err) {
      setError('Sorry, we could not find any flights for that search. Please try again.');
      console.error('Flight search error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredResults = useMemo(() => {
    if (filters.stops.length === 0) {
      return flightResults; // No filter applied, return all
    }
    return flightResults.filter(flight => {
      const stopCount = flight.legs[0].stopCount;
      // For "2+" stops, check if stopCount is 2 or more
      const twoPlusStops = filters.stops.includes(2) && stopCount >= 2;
      return filters.stops.includes(stopCount) || twoPlusStops;
    });
  }, [flightResults, filters]);

  return (
    <div className="font-sans">
        <div className="container mx-auto p-4">
            <header className="text-center my-8">
                <h1 className="text-5xl font-bold text-gray-100">Flight Search</h1>
                <p className="text-gray-400 mt-2">Find the best flights for your next adventure</p>
            </header>
            <main>
                <SearchBar 
                    onSearch={handleFlightSearch} 
                    flightLegs={flightLegs}
                    handleUpdateLeg={handleUpdateLeg}
                    handleAddLeg={handleAddLeg}
                    handleRemoveLeg={handleRemoveLeg}
                />
                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <ResultsDisplay 
                        flights={filteredResults} 
                        loading={isLoading} 
                        error={error} 
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
            </main>
        </div>
    </div>
  );
}

export default App;
