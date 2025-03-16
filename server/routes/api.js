const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const authMiddleware = require("../middleware/auth");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 14 } });

// Sample route
router.get("/test", (req, res) => {
  res.json({ message: "API route works!" });
});

// Routes
router.get(
  "/business/:businessId/info",
  authMiddleware,
  controller.getBusinessInfo
);
router.post("/business", authMiddleware, controller.addBusiness);

router.get(
  "/business/:businessId/employees",
  authMiddleware,
  controller.getEmployees
);
router.post("/employees", authMiddleware, upload.single('resume_pdf'), controller.addEmployee);
router.delete(
  "/employees/:employeeId",
  authMiddleware,
  controller.deleteEmployee
);
router.get('/employees/:employeeId/resume', authMiddleware, controller.downloadEmployeeResume);

router.get('/business/:businessId/job-openings', authMiddleware, controller.getJobOpenings);
router.post('/job-openings', authMiddleware, controller.addJobOpening);
router.delete('/job-openings/:jobOpeningId', authMiddleware, controller.deleteJobOpening);

router.get('/business/:businessId/applicants', authMiddleware, controller.getApplicants);
router.post('/applicants', authMiddleware, upload.single('resume_pdf'), controller.addApplicant);
router.delete('/applicants/:applicantId', authMiddleware, controller.deleteApplicant);
router.get('/applicants/:applicantId/resume', authMiddleware, controller.downloadApplicantResume);

router.get(
  "/business/info/:email",
  authMiddleware,
  controller.getBusinessInfoByEmail
);
// You can add more routes or import from other route files here
// Example: router.use('/products', require('./productRoutes'));

module.exports = router;
