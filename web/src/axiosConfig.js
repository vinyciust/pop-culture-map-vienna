// src/axiosConfig.js
import axios from 'axios';

// Set the base URL for all requests
axios.defaults.baseURL = 'http://127.0.0.1:5082/api/';

// Example of setting up interceptors
axios.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
