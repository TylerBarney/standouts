const express = require('express');
const router = express.Router();

// Sample route
router.get('/test', (req, res) => {
  res.json({ message: 'API route works!' });
});

// You can add more routes or import from other route files here
// Example: router.use('/users', require('./userRoutes'));

module.exports = router; 