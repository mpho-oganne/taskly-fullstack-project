import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  // prevents the default submisson of the form 
    setLoading(true); // application in the process of performing a task 
    setError(''); // Clear any previous error messages

    try {
      // Make a POST request to  backend for sign-in
      const response = await axios.post('http://localhost:3001/signin', { email, password });
      
      // Handle successful sign-in by storing the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect the user to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle failed sign-in attempts
      setError('Invalid email or password');
    } finally {
      setLoading(false); // Stop the loading once request is done
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
