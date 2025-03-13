const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const authMiddleware = require('../middleware/auth');

// Sample route
router.get('/test', (req, res) => {
  res.json({ message: 'API route works!' });
});

// Routes
router.get('/business/:businessId/info', authMiddleware, controller.getBusinessInfo);
router.post('/business', authMiddleware, controller.addBusiness);

router.get('/business/:businessId/employees', authMiddleware, controller.getEmployees);
router.post('/employees', authMiddleware, controller.addEmployee);

router.get('/business/:businessId/job-openings', authMiddleware, controller.getJobOpenings);
router.post('/job-openings', authMiddleware, controller.addJobOpening);

router.get('/business/:businessId/applicants', authMiddleware, controller.getApplicants);
router.post('/applicants', authMiddleware, controller.addApplicant);


// You can add more routes or import from other route files here
// Example: router.use('/products', require('./productRoutes'));

module.exports = router; 