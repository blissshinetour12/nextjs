import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import "../app/globals.css"
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call for admin login
      const response = await axios.post('/api/login', { email, password });

      // Assuming the API returns a token
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Redirect to admin dashboard
      router.push('/admin-dashboard');
    } catch (err) {
      console.error(err);
      alert('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                className="flex-1 outline-none"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                className="flex-1 outline-none"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
