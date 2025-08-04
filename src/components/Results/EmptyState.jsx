import React from 'react';

const EmptyState = () => (
  <div className="text-center p-10 bg-[#3c4043] rounded-lg">
    <h3 className="text-2xl font-semibold text-white mb-2">No Flights Found</h3>
    <p className="text-gray-400">Try adjusting your filters or search for a different date.</p>
  </div>
);

export default EmptyState;
