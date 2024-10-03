import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents default form submission behavior
    setLoading(true);  // Set loading state to true while processing
    setError('');  // Clear previous error messages

    try {
      // Make POST request to the server for sign-in
      const response = await axios.post('http://localhost:3001/user/signin', { email, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect user to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // Set error message if authentication fails
      setError('Invalid email or password');
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  // Navigate to the sign-up page
  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#e9ecf5]"> 
      <div className="flex bg-[#f2f6ff] p-10 rounded-lg shadow-lg space-x-8"> 
        
        {/* Login Section */}
        <div className="w-96 bg-[#f2f6ff] p-8"> 
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6"> 
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white"
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            
            <div className="text-right mb-4"> 
              <a
                href="#"
                className="text-gray-500 text-sm border border-gray-300 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200"
              >
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-pink-400 text-white py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>

        <div className="w-48 bg-gray-100 flex items-center justify-center rounded-r-lg">
          <button
            className="bg-gradient-to-r from-blue-400 to-pink-400 text-white py-3 px-6 rounded-lg"
            onClick={goToSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
