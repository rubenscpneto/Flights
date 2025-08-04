import React, { useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { SignIn, SignUp, UserButton, SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-react';
import { supabase } from './supabaseClient';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ThemeToggle from './components/ThemeToggle';
import { SWRConfig } from 'swr';

const Header = () => (
  <header className="flex justify-between items-center p-4 bg-white dark:bg-[#303134] text-gray-800 dark:text-white shadow-md">
    <Link to="/" className="text-xl font-bold tracking-wider">FlightFinder</Link>
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <SignedIn>
        <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Dashboard</Link>
        <UserButton afterSignOutUrl="/"/>
      </SignedIn>
      <SignedOut>
        <Link to="/sign-in" className="px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Sign In</Link>
      </SignedOut>
    </div>
  </header>
);

const ProtectedDashboard = () => {
    const { isSignedIn } = useUser();
    return isSignedIn ? <DashboardPage /> : <Navigate to="/sign-in" />;
}

const AuthLayout = ({ children }) => (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        {children}
    </div>
);


function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const setSupabaseAuth = async (token) => {
      if (token) {
        const { error } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: token,
        });
        if (error) {
          console.error('Supabase Error setting session:', error);
        }
      } else {
        await supabase.auth.signOut();
      }
    };

    const syncSupabaseSession = async () => {
      const supabaseAccessToken = await getToken({ template: 'supabase' });
      await setSupabaseAuth(supabaseAccessToken);
    };

    syncSupabaseSession();

  }, [getToken]);
  
  return (
    <SWRConfig>
        <div className="font-sans bg-gray-100 dark:bg-gray-900 min-h-screen">
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-in/*" element={<AuthLayout><SignIn routing="path" path="/sign-in" /></AuthLayout>} />
              <Route path="/sign-up/*" element={<AuthLayout><SignUp routing="path" path="/sign-up" /></AuthLayout>} />
              <Route path="/dashboard" element={<ProtectedDashboard />} />
            </Routes>
          </main>
        </div>
    </SWRConfig>
  );
}

export default App;
