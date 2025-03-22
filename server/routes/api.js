const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 14 },
});

// Sample route
router.get("/test", (req, res) => {
  res.json({ message: "API route works!" });
});

// Routes
router.get("/business/:businessId/info", controller.getBusinessInfo);
router.post("/business", controller.addBusiness);

router.get("/business/:businessId/employees", controller.getEmployees);
router.post("/employees", upload.single("resume_pdf"), controller.addEmployee);
router.delete("/employees/:employeeId", controller.deleteEmployee);
router.get("/employees/:employeeId/resume", controller.downloadEmployeeResume);

router.get("/business/:businessId/job-openings", controller.getJobOpenings);
router.post("/job-openings", controller.addJobOpening);
router.delete("/job-openings/:jobOpeningId", controller.deleteJobOpening);

router.get("/business/:businessId/applicants", controller.getApplicants);
router.post(
  "/applicants",
  upload.single("resume_pdf"),
  controller.addApplicant
);
router.delete("/applicants/:applicantId", controller.deleteApplicant);
router.get(
  "/applicants/:applicantId/resume",
  controller.downloadApplicantResume
);
router.get("/business/:businessId/applicants", controller.getApplicants);
router.post(
  "/applicants/batch",
  upload.array("resume_pdfs", 20),
  controller.addApplicantsBatch
);
router.post(
  "/applicants",
  upload.single("resume_pdf"),
  controller.addApplicant
);
router.delete("/applicants/:applicantId", controller.deleteApplicant);
router.get(
  "/applicants/:applicantId/resume",
  controller.downloadApplicantResume
);

router.get("/business/info/:email", controller.getBusinessInfoByEmail);

router.post(
  "/email-employee-resumes",
  upload.array("resumes"),
  controller.emailEmployeeResumes
);

router.post(
  "/email-applicant-resumes",
  upload.array("resumes"),
  controller.emailApplicantResumes
);

module.exports = router;
