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
    console.log("BUSINESS: ", business);
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
    const { name, business_id, resume_pdf, department, position_level } =
      req.body;
    const newEmployee = new Employee({
      name,
      business_id,
      resume_pdf,
      department,
      position_level,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
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
      name,
      email,
      business_id,
      job_opening_id,
      resume_pdf,
      department_id,
      position_level,
      match_score,
    } = req.body;

    const newApplicant = new Applicant({
      name,
      email,
      business_id,
      job_opening_id,
      resume_pdf,
      department_id,
      position_level,
      match_score: match_score || 0,
    });

    const savedApplicant = await newApplicant.save();
    res.status(201).json(savedApplicant);
  } catch (error) {
    logger.error("Error adding applicant", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add more controller methods as needed
