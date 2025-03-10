import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Example API methods
export const testApi = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Error testing API:', error);
    throw error;
  }
};

// Add more API methods as needed

export default api; 