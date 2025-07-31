// In src/api/mockFlightData.js
export const mockFlights = {
    data: {
        data: [ // Adjusted to match the real API's nested data structure
            {
                id: 'itinerary-01',
                price: { raw: 350.50 },
                legs: [
                    {
                        id: 'leg-01',
                        durationInMinutes: 180,
                        stopCount: 0,
                        departure: '2025-10-15T08:00:00',
                        arrival: '2025-10-15T11:00:00',
                        origin: { displayCode: 'JFK' },
                        destination: { displayCode: 'LAX' },
                        carriers: [
                            { name: 'American Airlines', iata: 'AA' }
                        ]
                    }
                ]
            },
            {
                id: 'itinerary-02',
                price: { raw: 299.99 },
                legs: [
                    {
                        id: 'leg-02',
                        durationInMinutes: 240,
                        stopCount: 1,
                        departure: '2025-10-15T09:30:00',
                        arrival: '2025-10-15T13:30:00',
                        origin: { displayCode: 'JFK' },
                        destination: { displayCode: 'LAX' },
                        carriers: [
                            { name: 'Delta Air Lines', iata: 'DL' }
                        ]
                    }
                ]
            },
            {
                id: 'itinerary-03',
                price: { raw: 450.00 },
                legs: [
                    {
                        id: 'leg-03',
                        durationInMinutes: 300,
                        stopCount: 2,
                        departure: '2025-10-15T07:00:00',
                        arrival: '2025-10-15T12:00:00',
                        origin: { displayCode: 'JFK' },
                        destination: { displayCode: 'LAX' },
                        carriers: [
                            { name: 'United Airlines', iata: 'UA' }
                        ]
                    }
                ]
            }
        ]
    }
};
