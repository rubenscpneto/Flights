// In src/api/skyScrapper.mock.js
import { mockAirports } from './mockAirportData';
import { mockFlights } from './mockFlightData';

// Simulates searching for airports
export const searchAirports = (query) => {
    console.log('Mock API: Searching airports for query:', query);
    return new Promise(resolve => {
        setTimeout(() => {
            const filteredAirports = mockAirports.filter(airport =>
                airport.presentation.title.toLowerCase().includes(query.toLowerCase())
            );
            resolve({ data: { data: filteredAirports } }); // Mimic real API structure
        }, 500); // Simulate 500ms network delay
    });
};

// Simulates searching for flights
export const searchFlights = (params) => {
    console.log('Mock API: Searching flights with params:', params);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockFlights);
        }, 1500); // Simulate 1.5s network delay
    });
};
