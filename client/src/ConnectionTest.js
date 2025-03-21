import React, { useState, useEffect } from 'react';
import { testApi } from './services/api';
import axios from 'axios';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Ready to test connection');
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    // Display the API URL being used
    setApiUrl(process.env.REACT_APP_API_URL || 'Using fallback URL');
  }, []);

  const clearResults = () => {
    setTestResults([]);
    setStatus('Ready to test connection');
    setError(null);
  };

  const addResult = (method, url, success, message) => {
    setTestResults(prev => [...prev, { method, url, success, message, timestamp: new Date().toISOString() }]);
  };

  const testWithAxios = async (url) => {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      addResult('axios', url, true, `Status: ${response.status}, Data: ${JSON.stringify(response.data)}`);
      return true;
    } catch (err) {
      let errorMessage = `Error: ${err.message}`;
      if (err.response) {
        errorMessage += ` (Status: ${err.response.status})`;
      }
      addResult('axios', url, false, errorMessage);
      return false;
    }
  };

  const testWithFetch = async (url) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(url, { 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      
      const data = await response.text();
      addResult('fetch', url, true, `Status: ${response.status}, Data: ${data}`);
      return true;
    } catch (err) {
      addResult('fetch', url, false, `Error: ${err.message}`);
      return false;
    }
  };

  const testWithXHR = (url) => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.timeout = 10000;
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          addResult('XMLHttpRequest', url, true, `Status: ${xhr.status}, Data: ${xhr.responseText}`);
          resolve(true);
        } else {
          addResult('XMLHttpRequest', url, false, `Error: Status ${xhr.status}`);
          resolve(false);
        }
      };
      
      xhr.onerror = function() {
        addResult('XMLHttpRequest', url, false, 'Network error occurred');
        resolve(false);
      };
      
      xhr.ontimeout = function() {
        addResult('XMLHttpRequest', url, false, 'Request timed out');
        resolve(false);
      };
      
      xhr.send();
    });
  };

  const runComprehensiveTest = async () => {
    setIsLoading(true);
    setStatus('Running comprehensive tests...');
    clearResults();
    
    // Extract the base URL without /api
    const baseUrl = process.env.REACT_APP_API_URL.replace('/api', '');
    
    // Test URLs to try
    const urls = [
      // Test the root of the server
      `${baseUrl}`,
      `${baseUrl}/`,
      
      // Test the API endpoints
      `${baseUrl}/api`,
      `${baseUrl}/api/`,
      `${baseUrl}/api/test`,
      
      // Try HTTP instead of HTTPS (if applicable)
      baseUrl.replace('https://', 'http://'),
      `${baseUrl.replace('https://', 'http://')}/api/test`,
    ];
    
    // Remove duplicate URLs
    const uniqueUrls = [...new Set(urls)];
    
    // Test using all three methods
    for (const url of uniqueUrls) {
      await testWithAxios(url);
      await testWithFetch(url);
      await testWithXHR(url);
    }
    
    setStatus('Comprehensive testing completed');
    setIsLoading(false);
  };

  const testConnection = async () => {
    setIsLoading(true);
    setStatus('Testing connection...');
    setError(null);
    clearResults();
    
    try {
      // Use our standard API method
      const response = await testApi();
      setStatus(`Connection successful! Server response: ${JSON.stringify(response)}`);
      addResult('testApi()', process.env.REACT_APP_API_URL, true, JSON.stringify(response));
    } catch (err) {
      console.error('Connection error details:', err);
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMsg = `Server responded with error: ${err.message}
Status: ${err.response.status}
Data: ${JSON.stringify(err.response.data)}
Headers: ${JSON.stringify(err.response.headers)}`;
        setError(errorMsg);
        addResult('testApi()', process.env.REACT_APP_API_URL, false, errorMsg);
      } else if (err.request) {
        // The request was made but no response was received
        const errorMsg = `No response received: ${err.message}
Network error or CORS issue.
Check if the server is running and accessible.
Check browser console for more details.`;
        setError(errorMsg);
        addResult('testApi()', process.env.REACT_APP_API_URL, false, errorMsg);
      } else {
        // Something happened in setting up the request that triggered an Error
        const errorMsg = `Request setup error: ${err.message}`;
        setError(errorMsg);
        addResult('testApi()', process.env.REACT_APP_API_URL, false, errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>API URL from Environment:</h3>
        <code>{apiUrl}</code>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={testConnection} 
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#074F57', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Testing...' : 'Test Standard Connection'}
        </button>
        
        <button 
          onClick={runComprehensiveTest} 
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#4A6D7C', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Testing...' : 'Run Comprehensive Tests'}
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Connection Status:</h3>
        <p>{status}</p>
      </div>
      
      {error && (
        <div style={{ marginBottom: '20px', color: 'red', border: '1px solid red', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <h3>Error Details:</h3>
          <pre>{error}</pre>
        </div>
      )}
      
      {testResults.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Test Results:</h3>
          <div style={{ maxHeight: '300px', overflow: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Method</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>URL</th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Status</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index} style={{ backgroundColor: result.success ? '#f0fff0' : '#fff0f0' }}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{result.method}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontSize: '0.8em', wordBreak: 'break-all' }}>{result.url}</td>
                    <td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                      {result.success ? 
                        <span style={{ color: 'green' }}>✓</span> : 
                        <span style={{ color: 'red' }}>✗</span>}
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontSize: '0.8em' }}>{result.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Troubleshooting Tips:</h3>
        <ul>
          <li>Check if your server is running (locally or on EC2)</li>
          <li>Verify the API URL in your client .env file</li>
          <li>Ensure CORS is properly configured on your server</li>
          <li>Check network connectivity and firewall settings</li>
          <li>Try both HTTP and HTTPS URLs</li>
          <li>Check security group settings on your EC2 instance</li>
          <li>Verify that the API endpoints are implemented on your server</li>
          <li>Check browser console for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionTest; 