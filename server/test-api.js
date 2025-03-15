/**
 * API Test Script
 * 
 * This script tests the API endpoints and verifies that data is correctly stored in the database.
 * It uses axios for HTTP requests and will start/stop the server automatically.
 * 
 * Run with: node test-api.js
 */

const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { spawn } = require('child_process');
const { getMongoUri, mongoOptions } = require('./config/db');

// Import models for verification
const { Business, Employee, Applicant, JobOpening } = require('./models/models');

// Load environment variables
dotenv.config();

// Configuration
const TEST_PORT = 5002; // Use a different port for testing
const API_BASE_URL = `http://localhost:${TEST_PORT}/api`;
let server;
let testBusinessId;
let testEmployeeId;
let testJobOpeningId;
let testApplicantId;

// Helper to wait for server to start
const waitForServer = async (retries = 10, delay = 500) => {
  for (let i = 0; i < retries; i++) {
    try {
      await axios.get(`${API_BASE_URL}/test`);
      console.log('Server is up and running');
      return true;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Server failed to start');
};

// Start the server
const startServer = () => {
  console.log('Starting server...');
  server = spawn('node', ['index.js'], { 
    stdio: 'inherit',
    env: { ...process.env, PORT: TEST_PORT }
  });
  
  return waitForServer();
};

// Stop the server
const stopServer = () => {
  if (server) {
    console.log('Stopping server...');
    server.kill();
  }
};

// Clean up test data
const cleanupTestData = async () => {
  if (testApplicantId) {
    await Applicant.findByIdAndDelete(testApplicantId);
  }
  if (testJobOpeningId) {
    await JobOpening.findByIdAndDelete(testJobOpeningId);
  }
  if (testEmployeeId) {
    await Employee.findByIdAndDelete(testEmployeeId);
  }
  if (testBusinessId) {
    await Business.findByIdAndDelete(testBusinessId);
  }
  console.log('Test data cleaned up');
};

// Test the Business API endpoints
const testBusinessAPI = async () => {
  console.log('\n--- Testing Business API ---');
  
  // Test creating a business
  const businessData = {
    name: 'API Test Company',
    email: `apitest-${Date.now()}@example.com`,
    password: 'password123'
  };
  
  const createResponse = await axios.post(`${API_BASE_URL}/business`, businessData);
  console.log('Business created via API');
  
  // Verify the response
  if (createResponse.status !== 201) {
    throw new Error(`Expected status 201, got ${createResponse.status}`);
  }
  
  testBusinessId = createResponse.data._id;
  
  // Verify the business was saved to the database
  const savedBusiness = await Business.findById(testBusinessId);
  if (!savedBusiness) {
    throw new Error('Business not found in database');
  }
  
  console.log(`Business verification: ${savedBusiness.name === businessData.name ? 'PASSED' : 'FAILED'}`);
  
  // Test retrieving business info
  const getResponse = await axios.get(`${API_BASE_URL}/business/${testBusinessId}/info`);
  console.log('Business info retrieved via API');
  
  // Verify the response
  if (getResponse.status !== 200) {
    throw new Error(`Expected status 200, got ${getResponse.status}`);
  }
  
  console.log(`Business info verification: ${getResponse.data.email === businessData.email ? 'PASSED' : 'FAILED'}`);
};

// Test the Employee API endpoints
const testEmployeeAPI = async () => {
  console.log('\n--- Testing Employee API ---');
  
  // Test creating an employee
  const employeeData = {
    name: 'API Test Employee',
    email: `employee-${Date.now()}@example.com`,
    business_id: testBusinessId,
    resume_pdf: 'path/to/resume.pdf',
    department_id: 'DEP001',
    position_level: 'Junior'
  };
  
  const createResponse = await axios.post(`${API_BASE_URL}/employees`, employeeData);
  console.log('Employee created via API');
  
  // Verify the response
  if (createResponse.status !== 201) {
    throw new Error(`Expected status 201, got ${createResponse.status}`);
  }
  
  testEmployeeId = createResponse.data._id;
  
  // Verify the employee was saved to the database
  const savedEmployee = await Employee.findById(testEmployeeId);
  if (!savedEmployee) {
    throw new Error('Employee not found in database');
  }
  
  console.log(`Employee verification: ${savedEmployee.name === employeeData.name ? 'PASSED' : 'FAILED'}`);
  
  // Test retrieving employees for a business
  const getResponse = await axios.get(`${API_BASE_URL}/business/${testBusinessId}/employees`);
  console.log('Employees retrieved via API');
  
  // Verify the response
  if (getResponse.status !== 200) {
    throw new Error(`Expected status 200, got ${getResponse.status}`);
  }
  
  const employees = getResponse.data;
  console.log(`Employee list verification: ${employees.length > 0 ? 'PASSED' : 'FAILED'}`);
  
  // Verify the employee we created is in the list
  const found = employees.some(emp => emp._id === testEmployeeId);
  console.log(`Employee in list verification: ${found ? 'PASSED' : 'FAILED'}`);
};

// Test the JobOpening API endpoints
const testJobOpeningAPI = async () => {
  console.log('\n--- Testing JobOpening API ---');
  
  // Test creating a job opening
  const jobData = {
    title: 'Test Developer Position',
    description: 'A position for testing the API',
    business_id: testBusinessId,
    department_id: 'DEP001',
    position_level: 'Entry'
  };
  
  const createResponse = await axios.post(`${API_BASE_URL}/job-openings`, jobData);
  console.log('Job Opening created via API');
  
  // Verify the response
  if (createResponse.status !== 201) {
    throw new Error(`Expected status 201, got ${createResponse.status}`);
  }
  
  testJobOpeningId = createResponse.data._id;
  
  // Verify the job opening was saved to the database
  const savedJob = await JobOpening.findById(testJobOpeningId);
  if (!savedJob) {
    throw new Error('Job Opening not found in database');
  }
  
  console.log(`Job Opening verification: ${savedJob.title === jobData.title ? 'PASSED' : 'FAILED'}`);
  
  // Test retrieving job openings for a business
  const getResponse = await axios.get(`${API_BASE_URL}/business/${testBusinessId}/job-openings`);
  console.log('Job Openings retrieved via API');
  
  // Verify the response
  if (getResponse.status !== 200) {
    throw new Error(`Expected status 200, got ${getResponse.status}`);
  }
  
  const jobs = getResponse.data;
  console.log(`Job Opening list verification: ${jobs.length > 0 ? 'PASSED' : 'FAILED'}`);
};

// Test the Applicant API endpoints
const testApplicantAPI = async () => {
  console.log('\n--- Testing Applicant API ---');
  
  // Test creating an applicant
  const applicantData = {
    name: 'Test Applicant',
    email: `applicant-${Date.now()}@example.com`,
    business_id: testBusinessId,
    job_opening_id: testJobOpeningId,
    resume_pdf: 'path/to/applicant_resume.pdf',
    department_id: 'DEP001',
    position_level: 'Entry',
    compatibility: 85
  };
  
  const createResponse = await axios.post(`${API_BASE_URL}/applicants`, applicantData);
  console.log('Applicant created via API');
  
  // Verify the response
  if (createResponse.status !== 201) {
    throw new Error(`Expected status 201, got ${createResponse.status}`);
  }
  
  testApplicantId = createResponse.data._id;
  
  // Verify the applicant was saved to the database
  const savedApplicant = await Applicant.findById(testApplicantId);
  if (!savedApplicant) {
    throw new Error('Applicant not found in database');
  }
  
  console.log(`Applicant verification: ${savedApplicant.name === applicantData.name ? 'PASSED' : 'FAILED'}`);
  
  // Test retrieving applicants for a business
  const getResponse = await axios.get(`${API_BASE_URL}/business/${testBusinessId}/applicants`);
  console.log('Applicants retrieved via API');
  
  // Verify the response
  if (getResponse.status !== 200) {
    throw new Error(`Expected status 200, got ${getResponse.status}`);
  }
  
  const applicants = getResponse.data;
  console.log(`Applicant list verification: ${applicants.length > 0 ? 'PASSED' : 'FAILED'}`);
};

// Test the Resumes API endpoints
const testResumesAPI = async () => {
  console.log('\n--- Testing Resumes API ---');
  
  // Test retrieving resumes
  const getResponse = await axios.get(`${API_BASE_URL}/business/${testBusinessId}/resumes`);
  console.log('Resumes retrieved via API');
  
  // Verify the response
  if (getResponse.status !== 200) {
    throw new Error(`Expected status 200, got ${getResponse.status}`);
  }
  
  // Verify we have both employee and applicant resumes
  const resumes = getResponse.data;
  console.log(`Resume data structure verification: ${resumes.employees && resumes.applicants ? 'PASSED' : 'FAILED'}`);
  
  // Test updating an employee resume
  const updateData = {
    type: 'employee',
    id: testEmployeeId,
    resume_pdf: 'path/to/updated_resume.pdf'
  };
  
  const updateResponse = await axios.post(`${API_BASE_URL}/resumes`, updateData);
  console.log('Resume updated via API');
  
  // Verify the response
  if (updateResponse.status !== 200) {
    throw new Error(`Expected status 200, got ${updateResponse.status}`);
  }
  
  // Verify the resume was updated in the database
  const updatedEmployee = await Employee.findById(testEmployeeId);
  console.log(`Resume update verification: ${updatedEmployee.resume_pdf === updateData.resume_pdf ? 'PASSED' : 'FAILED'}`);
};

// Main test function
const runTests = async () => {
  try {
    // Connect to the database
    const mongoUri = getMongoUri();
    await mongoose.connect(mongoUri, mongoOptions);
    console.log('Connected to MongoDB for verification');
    
    // Start the server
    await startServer();
    
    // Run tests
    await testBusinessAPI();
    await testEmployeeAPI();
    await testJobOpeningAPI();
    await testApplicantAPI();
    await testResumesAPI();
    
    console.log('\n✅ All API tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  } finally {
    // Clean up
    await cleanupTestData();
    
    // Close connections
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
    // Stop the server
    stopServer();
  }
};

// Run the tests
runTests(); 