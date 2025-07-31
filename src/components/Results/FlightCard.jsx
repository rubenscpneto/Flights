import React from 'react';

const FlightCard = ({ flight }) => {
  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCarrierLogo = (carrier) => {
    // In a real app, you would have a mapping of carrier names to logo URLs
    return `https://logos.skysscanner.com/images/airlines/favicon/${carrier.iata}.png`;
  }

  return (
    <div className="p-4 mb-4 bg-[#303134] border border-gray-700 rounded-lg shadow-sm hover:shadow-lg hover:border-gray-600 transition-all">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center w-full sm:w-1/4">
          <img 
            src={getCarrierLogo(flight.legs[0].carriers[0])} 
            alt={flight.legs[0].carriers[0].name} 
            className="w-8 h-8 mr-4 rounded-full bg-white p-1"
          />
          <div className="font-bold text-gray-100">{flight.legs[0].carriers[0].name}</div>
        </div>
        <div className="flex justify-around w-full sm:w-2/4 text-center">
            <div>
                <div className="text-lg font-semibold text-gray-200">{formatTime(flight.legs[0].departure)}</div>
                <div className="text-sm text-gray-400">{flight.legs[0].origin.displayCode}</div>
            </div>
            <div className="text-sm text-gray-400 self-center">
                <div>{formatDuration(flight.legs[0].durationInMinutes)}</div>
                <div className="w-16 h-px bg-gray-600 my-1"></div>
                <div>{flight.legs[0].stopCount === 0 ? 'Non-stop' : `${flight.legs[0].stopCount} stop(s)`}</div>
            </div>
            <div>
                <div className="text-lg font-semibold text-gray-200">{formatTime(flight.legs[0].arrival)}</div>
                <div className="text-sm text-gray-400">{flight.legs[0].destination.displayCode}</div>
            </div>
        </div>
        <div className="w-full sm:w-1/4 text-right">
          <div className="text-xl font-bold text-green-400">{formatPrice(flight.price.raw)}</div>
          <button className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm font-semibold">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
