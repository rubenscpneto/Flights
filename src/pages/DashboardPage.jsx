import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const DashboardPage = () => {
  const { user } = useAuth();
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 2. Initialize navigate

  // 3. Create the handler function
  const handleSearchAgain = (search) => {
    // Navigate to the home page and pass the search object in the state
    navigate('/', { state: { savedSearch: search } });
  };

  useEffect(() => {
    const fetchSearches = async () => {
      if (!user) return;
      
      setLoading(true);
      
      const { data, error } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setSavedSearches(data);
      }
      if(error){
        console.error("Error fetching searches: ", error);
      }
      setLoading(false);
    };

    if (user) {
        fetchSearches();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-white">Loading saved searches...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Saved Searches</h1>
      {savedSearches.length > 0 ? (
        <div className="space-y-4">
          {savedSearches.map(search => (
            // 4. Change the div to a button and add the onClick handler
            <button 
              key={search.id} 
              onClick={() => handleSearchAgain(search)}
              className="w-full text-left p-4 bg-white dark:bg-[#3c4043] rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-lg text-gray-900 dark:text-white">{search.origin_name} to {search.destination_name}</div>
              <div className="text-gray-600 dark:text-gray-400">Date: {new Date(search.departure_date).toLocaleDateString()}</div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">You have no saved searches.</p>
      )}
    </div>
  );
};

export default DashboardPage;
