const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { getMongoUri, mongoOptions } = require('./config/db');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Get the MongoDB URI from our config
const mongoUri = getMongoUri();

// For debugging - show connection string with password masked
const debugUri = mongoUri.replace(/:[^:@]*@/, ':****@');
logger.info(`Attempting to connect to MongoDB: ${debugUri}`);

// MongoDB Connection
mongoose.connect(mongoUri, mongoOptions)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Routes
app.use('/api', require('./routes/api'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
}); 