// In src/api/skyScrapper.js

import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const apiClient = axios.create({
    baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1',
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
});

export const searchAirports = (query) => {
    return apiClient.get('/flights/searchAirport', {
        params: { query }
    });
};

export const searchFlights = (params) => {
    const searchParams = {
        originSkyId: params.origin.skyId,
        destinationSkyId: params.destination.skyId,
        originEntityId: params.origin.entityId,
        destinationEntityId: params.destination.entityId,
        date: params.date, // Format: YYYY-MM-DD
        adults: params.adults || 1,
        currency: 'USD',
    };

    if (params.returnDate) {
        searchParams.returnDate = params.returnDate;
    }

    return apiClient.get('/flights/searchFlights', {
        params: searchParams
    });
};
