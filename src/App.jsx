import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const Header = () => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Redirect to home after sign out
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#303134] text-white shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wider">FlightFinder</Link>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-700 transition-colors">Dashboard</Link>
            <button onClick={handleSignOut} className="px-3 py-2 rounded hover:bg-gray-700 transition-colors">Sign Out</button>
          </>
        ) : (
          <Link to="/sign-in" className="px-3 py-2 rounded hover:bg-gray-700 transition-colors">Sign In</Link>
        )}
      </div>
    </header>
  );
};

const ProtectedRoute = ({ children }) => {
    const { session } = useAuth();
    return session ? children : <Navigate to="/sign-in" />;
}

const AuthLayout = ({ children }) => (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        {children}
    </div>
);

function App() {
  return (
    <div className="font-sans bg-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<AuthLayout><SignInPage /></AuthLayout>} />
          <Route path="/sign-up" element={<AuthLayout><SignUpPage /></AuthLayout>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
