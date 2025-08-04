import React, { useState, useMemo, useEffect } from 'react'; // 1. Add useEffect
import { useLocation } from 'react-router-dom'; // 2. Import useLocation
import SearchBar from '../components/SearchBar/SearchBar';
import ResultsDisplay from '../components/Results/ResultsDisplay';
import { searchFlights } from '../api/skyScrapper.mock';

const HomePage = () => {
    const [flightResults, setFlightResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        stops: []
    });
    const [sortBy, setSortBy] = useState('price');
    const [flightLegs, setFlightLegs] = useState([
        { id: 1, origin: null, destination: null, date: new Date() },
        { id: 2, origin: null, destination: null, date: new Date(new Date().setDate(new Date().getDate() + 7)) },
    ]);
    const [searchParams, setSearchParams] = useState(null);
    const location = useLocation(); // 3. Get the location object

    // 4. Add this useEffect to handle incoming searches from the dashboard
    useEffect(() => {
        const incomingSearch = location.state?.savedSearch;
        if (incomingSearch) {
            console.log("Rerunning saved search:", incomingSearch);

            // Reconstruct the airport objects for the state
            const departureAirport = {
                skyId: incomingSearch.origin_id,
                presentation: { suggestionTitle: incomingSearch.origin_name }
            };
            const destinationAirport = {
                skyId: incomingSearch.destination_id,
                presentation: { suggestionTitle: incomingSearch.destination_name }
            };

            // Update the flight legs state to pre-fill the form
            setFlightLegs([
                { ...flightLegs[0], origin: departureAirport, destination: destinationAirport, date: new Date(incomingSearch.departure_date) },
                flightLegs[1] // Keep the second leg as is or update if you save return dates
            ]);

            // Construct the search parameters and execute the search
            const searchParamsToRun = {
                tripType: 'roundtrip', // Or determine this based on saved data
                departureAirport,
                destinationAirport,
                departureDate: new Date(incomingSearch.departure_date),
                // Add passengers, cabinClass etc. if you save them
            };
            handleFlightSearch(searchParamsToRun);
        }
    }, [location.state]); // This effect runs only when the location state changes


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
        if (flightLegs.length <= 2) return;
        const newLegs = flightLegs.filter((_, i) => i !== index);
        setFlightLegs(newLegs);
    };

    const handleFlightSearch = async (params) => {
        setSearchParams(params);
        if (params.tripType !== 'multicity') {
            if (!params.departureAirport || !params.destinationAirport) {
                setError('Please select both a departure and destination airport.');
                return;
            }
        } else {
            for (const leg of flightLegs) {
                if (!leg.origin || !leg.destination) {
                    setError('Please fill all origin and destination fields for multi-city search.');
                    return;
                }
            }
        }

        setIsLoading(true);
        setError('');
        setFlightResults([]);

        try {
            if (params.tripType === 'multicity') {
                console.log("Searching for multi-city flights with these legs:", params.flightLegs);
                const response = await searchFlights(params.flightLegs[0]);
                setFlightResults(response.data.data);
            } else {
                const response = await searchFlights(params);
                setFlightResults(response.data.data);
            }
        } catch (err) {
            setError('Sorry, we could not find any flights for that search. Please try again.');
            console.error('Flight search error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const processedResults = useMemo(() => {
        let results = [...flightResults];

        if (filters.stops.length > 0) {
            results = results.filter(flight => {
                const stopCount = flight.legs[0].stopCount;
                const twoPlusStops = filters.stops.includes(2) && stopCount >= 2;
                return filters.stops.includes(stopCount) || twoPlusStops;
            });
        }

        if (sortBy === 'price') {
            results.sort((a, b) => a.price.raw - b.price.raw);
        } else if (sortBy === 'duration') {
            results.sort((a, b) => a.legs[0].durationInMinutes - b.legs[0].durationInMinutes);
        }

        return results;
    }, [flightResults, filters, sortBy]);

    return (
        <div>
            <SearchBar
                onSearch={handleFlightSearch}
                flightLegs={flightLegs}
                handleUpdateLeg={handleUpdateLeg}
                handleAddLeg={handleAddLeg}
                handleRemoveLeg={handleRemoveLeg}
            />
            <div className="flex flex-col lg:flex-row gap-8 mt-8 max-w-5xl mx-auto">
                <ResultsDisplay
                    flights={processedResults}
                    loading={isLoading}
                    error={error}
                    filters={filters}
                    setFilters={setFilters}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    searchParams={searchParams}
                />
            </div>
        </div>
    );
};

export default HomePage;
