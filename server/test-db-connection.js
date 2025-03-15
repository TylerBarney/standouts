/**
 * Database Connection Test
 * 
 * This script tests the MongoDB connection and performs basic operations
 * with the defined models to verify they work correctly.
 * 
 * Run with: node test-db-connection.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { getMongoUri, mongoOptions } = require('./config/db');

// Import models
const { Business, Employee, Applicant, JobOpening } = require('./models/models');

// Load environment variables
dotenv.config();

// Get MongoDB URI from config
const mongoUri = getMongoUri();

// For debugging - show connection string with password masked
const debugUri = mongoUri.replace(/:[^:@]*@/, ':****@');
console.log(`Attempting to connect to MongoDB: ${debugUri}`);

// Test data for our models
const testBusiness = {
  name: 'Test Company',
  email: `test-${Date.now()}@example.com`, // Unique email
  password: 'password123'
};

// Connect to MongoDB
mongoose.connect(mongoUri, mongoOptions)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    try {
      // Test Business model
      console.log('\n--- Testing Business Model ---');
      const business = new Business(testBusiness);
      const savedBusiness = await business.save();
      console.log('Business created:', savedBusiness._id);
      
      // Test JobOpening model
      console.log('\n--- Testing JobOpening Model ---');
      const jobOpening = new JobOpening({
        business_id: savedBusiness._id,
        title: 'Test Job',
        description: 'This is a test job opening',
        department_id: 'DEP001',
        position_level: 'Entry'
      });
      const savedJob = await jobOpening.save();
      console.log('Job Opening created:', savedJob._id);
      
      // Test Employee model
      console.log('\n--- Testing Employee Model ---');
      const employee = new Employee({
        name: 'Test Employee',
        business_id: savedBusiness._id,
        resume_pdf: 'path/to/resume.pdf',
        department_id: 'DEP001',
        position_level: 'Junior'
      });
      const savedEmployee = await employee.save();
      console.log('Employee created:', savedEmployee._id);
      
      // Test Applicant model
      console.log('\n--- Testing Applicant Model ---');
      const applicant = new Applicant({
        name: 'Test Applicant',
        email: 'applicant@example.com',
        business_id: savedBusiness._id,
        job_opening_id: savedJob._id,
        resume_pdf: 'path/to/applicant/resume.pdf',
        department_id: 'DEP001',
        position_level: 'Entry',
        compatibility: 85
      });
      const savedApplicant = await applicant.save();
      console.log('Applicant created:', savedApplicant._id);
      
      // Test querying data
      console.log('\n--- Testing Queries ---');
      const businessCount = await Business.countDocuments();
      const jobCount = await JobOpening.countDocuments();
      const employeeCount = await Employee.countDocuments();
      const applicantCount = await Applicant.countDocuments();
      
      console.log(`Database counts - Businesses: ${businessCount}, Jobs: ${jobCount}, Employees: ${employeeCount}, Applicants: ${applicantCount}`);
      
      // Clean up test data
      console.log('\n--- Cleaning Test Data ---');
      await Applicant.deleteOne({ _id: savedApplicant._id });
      await Employee.deleteOne({ _id: savedEmployee._id });
      await JobOpening.deleteOne({ _id: savedJob._id });
      await Business.deleteOne({ _id: savedBusiness._id });
      console.log('Test data cleaned up successfully');
      
      console.log('\n✅ All tests completed successfully!');
    } catch (error) {
      console.error('Error during model testing:', error);
    } finally {
      // Close the connection
      await mongoose.connection.close();
      console.log('\nMongoDB connection closed');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 