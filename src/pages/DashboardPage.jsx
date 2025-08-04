import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../supabaseClient';

const DashboardPage = () => {
  const { user } = useUser();
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchSearches();
  }, [user]);

  if (loading) {
    return <div>Loading saved searches...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">My Saved Searches</h1>
      {savedSearches.length > 0 ? (
        <div className="space-y-4">
          {savedSearches.map(search => (
            <div key={search.id} className="p-4 bg-[#3c4043] rounded-lg shadow-md">
              <div className="font-semibold text-lg text-white">{search.origin_name} to {search.destination_name}</div>
              <div className="text-gray-400">Date: {new Date(search.departure_date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">You have no saved searches.</p>
      )}
    </div>
  );
};

export default DashboardPage;
