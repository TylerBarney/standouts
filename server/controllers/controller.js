/**
 * User Controller
 * Handles business logic for user-related operations
 */

// Import models
const {
  Business,
  Employee,
  JobOpening,
  Applicant,
} = require("../models/models.js");
const logger = require("../utils/logger");
const {
  extractNameFromResume,
  extractEmailFromResume,
} = require("../utils/pdfParser");
const sendEmail = require("../utils/sendEmail");

// Controller methods
exports.getBusinessInfo = async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId);
    res.json(business);
  } catch (error) {
    logger.error("Error fetching business info", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBusinessInfoByEmail = async (req, res) => {
  try {
    const business = await Business.findOne({ email: req.params.email });
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }
    res.json(business);
  } catch (error) {
    logger.error("Error fetching business info", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addBusiness = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newBusiness = new Business({ name, email, password });
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    logger.error("Error adding business", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      business_id: req.params.businessId,
    });
    res.json(employees);
  } catch (error) {
    logger.error("Error fetching employees", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { business_id, department, position_level } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume PDF is required" });
    }

    let resume_pdf, resume_pdf_filename;

    resume_pdf = req.file.buffer;
    const name = await extractNameFromResume(resume_pdf);
    resume_pdf_filename = name + "_Resume.pdf";

    const newEmployee = new Employee({
      name,
      business_id,
      resume_pdf,
      resume_pdf_filename,
      department,
      position_level,
    });

    const savedEmployee = await newEmployee.save();

    // Don't return the resume_pdf or resume_pdf_filename in the response
    const responseEmployee = savedEmployee.toObject();
    delete responseEmployee.resume_pdf;
    delete responseEmployee.resume_pdf_filename;

    res.status(201).json(responseEmployee);
  } catch (error) {
    logger.error("Error adding employee", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.employeeId);
    res.status(200).json(employee);
  } catch (error) {
    logger.error("Error deleting employee", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.downloadEmployeeResume = async (req, res) => {
  try {
    console.log(req.params.employeeId);
    const employee = await Employee.findById(req.params.employeeId);
    res.setHeader("Content-Type", "employee/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${employee.resume_pdf_filename}"`
    );
    res.send(employee.resume_pdf);
  } catch (error) {
    logger.error("Error downloading employee resume", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Job Openings
exports.getJobOpenings = async (req, res) => {
  try {
    const jobOpenings = await JobOpening.find({
      business_id: req.params.businessId,
    });
    res.json(jobOpenings);
  } catch (error) {
    logger.error("Error fetching job openings", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addJobOpening = async (req, res) => {
  try {
    const { title, description, business_id, department_id, position_level } =
      req.body;

    const newJobOpening = new JobOpening({
      title,
      description,
      business_id,
      department_id,
      position_level,
    });

    const savedJobOpening = await newJobOpening.save();
    res.status(201).json(savedJobOpening);
  } catch (error) {
    logger.error("Error adding job opening", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteJobOpening = async (req, res) => {
  try {
    const jobOpening = await JobOpening.findByIdAndDelete(
      req.params.jobOpeningId
    );
    res.status(200).json(jobOpening);
  } catch (error) {
    logger.error("Error deleting job opening", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Applicants
exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find({
      business_id: req.params.businessId,
    });

    res.json(applicants);
  } catch (error) {
    logger.error("Error fetching applicants", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addApplicant = async (req, res) => {
  try {
    const {
      business_id,
      job_opening_id,
      department_id,
      position_level,
      compatibility,
    } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Resume PDF is required" });
    }

    let resume_pdf, resume_pdf_filename;

    resume_pdf = req.file.buffer;
    const name = await extractNameFromResume(resume_pdf);
    resume_pdf_filename = name + "_Resume.pdf";

    const email = await extractEmailFromResume(resume_pdf);

    const newApplicant = new Applicant({
      name,
      email,
      business_id,
      job_opening_id,
      resume_pdf,
      resume_pdf_filename,
      department_id,
      position_level,
      compatibility: compatibility || 0,
    });

    const savedApplicant = await newApplicant.save();

    // Don't return the resume_pdf or resume_pdf_filename in the response
    const responseApplicant = savedApplicant.toObject();
    delete responseApplicant.resume_pdf;
    delete responseApplicant.resume_pdf_filename;

    res.status(201).json(responseApplicant);
  } catch (error) {
    logger.error("Error adding applicant", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addApplicantsBatch = async (req, res) => {
  try {
    const applicantsMetadata = JSON.parse(req.body.applicants_metadata);
    const resume_pdfs = req.files;

    const results = [];
    for (let i = 0; i < applicantsMetadata.length; i++) {
      const applicantMetadata = applicantsMetadata[i];
      const resume_pdf = resume_pdfs[i].buffer;

      if (!resume_pdf) {
        logger.error(`Resume PDF is missing for applicant ${i}`);
        continue;
      }

      const name = await extractNameFromResume(resume_pdf);
      const email = await extractEmailFromResume(resume_pdf);

      const applicant = new Applicant({
        name,
        email,
        ...applicantMetadata,
        resume_pdf,
        resume_pdf_filename: name + "_Resume.pdf",
      });

      const savedApplicant = await applicant.save();

      // Don't return the resume_pdf or resume_pdf_filename in the response
      const responseApplicant = savedApplicant.toObject();
      delete responseApplicant.resume_pdf;
      delete responseApplicant.resume_pdf_filename;

      results.push(responseApplicant);
    }

    res.status(201).json(results);
  } catch (error) {
    logger.error("Error adding applicants batch", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.downloadApplicantResume = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.applicantId);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${applicant.resume_pdf_filename}"`
    );
    res.send(applicant.resume_pdf);
  } catch (error) {
    logger.error("Error downloading applicant resume", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.applicantId);
    res.status(200).json(applicant);
  } catch (error) {
    logger.error("Error deleting applicant", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Employees
exports.emailEmployeeResumes = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { level, department, businessId } = req.body;

    // Convert uploaded files into attachments
    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    }));

    const emailHeader = `New Employee Resumes`;

    // Email Body
    const emailBody = `Aubry, Chloey, and Tyler,\n
      Business ID: ${businessId}
      Level: ${level}
      Department: ${department}
      \n\nAttached are the new employee resumes that were uploaded by the business. Use them to compare with corresponding applicants.
      \n\nThank you,\nStandout
    `;

    // Send email
    await sendEmail(emailHeader, emailBody, attachments);

    res.json({ message: "Email sent with uploaded resumes!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

exports.emailApplicantResumes = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { jobId, level, department, businessId } = req.body;

    // Convert uploaded files into attachments
    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    }));

    const emailHeader = `New Applicants For Job ID: ${jobId}`;

    // Email Body
    const emailBody = `Aubry, Chloey, and Tyler,\n
      Business ID: ${businessId}
      Job ID: ${jobId}
      Level: ${level}
      Department: ${department}
      \n\nAnalyze the compatibilty for these new applicants.
      \nTo calculate compatibility, compare the applicant resumes with the employee resumes from the same department and level.
      \n\nThanks,\nStandout
    `;

    // Send email
    await sendEmail(emailHeader, emailBody, attachments);

    res.json({ message: "Email sent with uploaded resumes!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
