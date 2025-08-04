import React from 'react';
import { motion } from 'framer-motion';

const FlightCard = ({ flight, onSelect }) => {
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
    return `https://logos.skysscanner.com/images/airlines/favicon/${carrier.iata}.png`;
  }
  
  const itemVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <motion.button
        onClick={onSelect}
        variants={itemVariants}
        className="w-full text-left p-4 bg-[#3c4043] rounded-lg shadow-md hover:bg-gray-700 transition-colors"
    >
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
        </div>
      </div>
    </motion.button>
  );
};

export default FlightCard;
