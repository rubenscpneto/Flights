// In src/api/mockAirportData.js
export const mockAirports = [
    {
        skyId: 'JFK',
        entityId: '12345',
        presentation: {
            title: 'John F. Kennedy International Airport',
            suggestionTitle: 'New York (JFK)',
            subtitle: 'New York, United States'
        },
        navigation: { // Added for compatibility with existing code
            relevantFlightParams: {
                skyId: 'JFK',
                entityId: '12345',
            }
        }
    },
    {
        skyId: 'LAX',
        entityId: '67890',
        presentation: {
            title: 'Los Angeles International Airport',
            suggestionTitle: 'Los Angeles (LAX)',
            subtitle: 'California, United States'
        },
        navigation: { // Added for compatibility with existing code
            relevantFlightParams: {
                skyId: 'LAX',
                entityId: '67890',
            }
        }
    },
    {
        skyId: 'LHR',
        entityId: '11223',
        presentation: {
            title: 'London Heathrow Airport',
            suggestionTitle: 'London (LHR)',
            subtitle: 'United Kingdom'
        },
        navigation: { // Added for compatibility with existing code
            relevantFlightParams: {
                skyId: 'LHR',
                entityId: '11223',
            }
        }
    }
];
