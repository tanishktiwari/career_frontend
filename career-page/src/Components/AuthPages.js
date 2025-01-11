import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPages = () => {
  
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // For remember me checkbox
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Track password visibility
  const navigate = useNavigate(); // Hook to handle redirection

  useEffect(() => {
    // Check if there's a JWT token stored in localStorage and auto-login
    const savedToken = localStorage.getItem('jwtToken');
    if (savedToken) {
      // If a token is found, make a request to auto-login or fill the username and password
      setUsername(localStorage.getItem('savedUsername') || '');
      setPassword(''); // Do not save the password for security
    }
  }, []);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(''); // Clear any errors when toggling views
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLoginView) {
        // Send login request to backend
        response = await axios.post('https://career-page-j4ik.onrender.com/api/auth/login', { username, password });
        alert(response.data.message);

        if (response.data.token) {
          // Store JWT and username in localStorage if "Remember Me" is checked
          if (rememberMe) {
            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('savedUsername', username);
          }

          // Redirect to the jobs list page after successful login
          navigate('/list');
        }
      } else {
        // Send registration request to backend
        response = await axios.post('https://career-page-j4ik.onrender.com/api/auth/register', { username, password });
        alert(response.data.message);
      }
      // Clear form fields after submission
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleLogout = () => {
    // Clear JWT and username from localStorage on logout
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('savedUsername');
    setUsername('');
    setPassword('');
  };

  const handlePostJobClick = () => {
    navigate("/"); // Correctly use navigate here
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4">
        <h1 className="text-4xl font-bold text-[#4fe8a4] cursor-pointer" onClick={handlePostJobClick} >JobsPortal</h1>
        <div className="flex gap-4">
          <button
            className="text-[#4fe8a4] hover:text-emerald-700"
            onClick={() => setIsLoginView(true)}
          >
            Login
          </button>
        </div>
      </nav>

      <div className="text-center">
        <h2 className="text-2xl font-bold bg-[#f4f5f7] h-20 flex items-center justify-center mb-8">
          {isLoginView ? 'Login' : 'Register'}
        </h2>
      </div>

      {/* Auth Container */}
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-bold">Username</label>
              <input
                type="text"
                placeholder="Username *"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4fe8a4] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-bold">Password</label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4fe8a4] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {isPasswordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 3-2.5 5-5 5S5 15 5 12s2.5-5 5-5 5 2 5 5z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 3-2.5 5-5 5S5 15 5 12s2.5-5 5-5 5 2 5 5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="rememberMe"
                className="h-4 w-4"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#4fe8a4] text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              {isLoginView ? 'Login' : 'Create Account'}
            </button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {isLoginView && (
              <p className="text-center mt-4">
                Not a member?{' '}
                <button
                  type="button"
                  onClick={toggleView}
                  className="text-black hover:text-emerald-700 font-bold"
                >
                  Register
                </button>
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4fe8a4] text-white p-4 text-center">
        <p>&copy; 2024 Jobs Portal. Designed By Tanishk Tiwari.</p>
      </footer>
    </div>
  );
};

export default AuthPages;
