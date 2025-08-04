import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/'); // Redirect to home on successful sign-in
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-[#303134] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 border-gray-600" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400">
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="text-sm text-center text-gray-400">
        Don't have an account? <Link to="/sign-up" className="font-medium text-blue-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
};
export default SignInPage;
