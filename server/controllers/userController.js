/**
 * User Controller
 * Handles business logic for user-related operations
 */

// Import models
const { Business, Employee, JobOpening, Applicant } = require('../models/models.js');
const logger = require('../utils/logger');

// Controller methods
exports.getBusinessInfo = async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId);
    res.json(business);
  } catch (error) {
    logger.error('Error fetching business info', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addBusiness = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const newBusiness = new Business({ name, email, password });
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    logger.error('Error adding business', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ business_id: req.params.businessId });
    res.json(employees);
  } catch (error) {
    logger.error('Error fetching employees', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { name, business_id, resume_pdf, department_id, position_level, email } = req.body;
    
    const newEmployee = new Employee({
      name,
      business_id,
      resume_pdf,
      department_id,
      position_level,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`
    });
    
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    logger.error('Error adding employee', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Job Openings
exports.getJobOpenings = async (req, res) => {
  try {
    const jobOpenings = await JobOpening.find({ business_id: req.params.businessId });
    res.json(jobOpenings);
  } catch (error) {
    logger.error('Error fetching job openings', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addJobOpening = async (req, res) => {
  try {
    const { title, description, business_id, department_id, position_level } = req.body;
    
    const newJobOpening = new JobOpening({
      title,
      description,
      business_id,
      department_id,
      position_level
    });
    
    const savedJobOpening = await newJobOpening.save();
    res.status(201).json(savedJobOpening);
  } catch (error) {
    logger.error('Error adding job opening', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Applicants
exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find({ business_id: req.params.businessId });
    res.json(applicants);
  } catch (error) {
    logger.error('Error fetching applicants', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addApplicant = async (req, res) => {
  try {
    const { name, email, business_id, job_opening_id, resume_pdf, department_id, position_level, match_score } = req.body;
    
    const newApplicant = new Applicant({
      name,
      email,
      business_id,
      job_opening_id,
      resume_pdf,
      department_id,
      position_level,
      match_score: match_score || 0
    });
    
    const savedApplicant = await newApplicant.save();
    res.status(201).json(savedApplicant);
  } catch (error) {
    logger.error('Error adding applicant', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Resumes
exports.getResumes = async (req, res) => {
  try {
    // This could retrieve all resumes for employees and applicants
    const employees = await Employee.find({ business_id: req.params.businessId }, 'name resume_pdf');
    const applicants = await Applicant.find({ business_id: req.params.businessId }, 'name resume_pdf');
    
    const resumes = {
      employees: employees.map(e => ({ id: e._id, name: e.name, type: 'employee', resume_pdf: e.resume_pdf })),
      applicants: applicants.map(a => ({ id: a._id, name: a.name, type: 'applicant', resume_pdf: a.resume_pdf }))
    };
    
    res.json(resumes);
  } catch (error) {
    logger.error('Error fetching resumes', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addResume = async (req, res) => {
  try {
    const { type, id, resume_pdf } = req.body;
    
    if (type === 'employee') {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      
      employee.resume_pdf = resume_pdf;
      await employee.save();
      return res.status(200).json(employee);
    } else if (type === 'applicant') {
      const applicant = await Applicant.findById(id);
      if (!applicant) {
        return res.status(404).json({ error: 'Applicant not found' });
      }
      
      applicant.resume_pdf = resume_pdf;
      await applicant.save();
      return res.status(200).json(applicant);
    } else {
      return res.status(400).json({ error: 'Invalid type specified' });
    }
  } catch (error) {
    logger.error('Error adding resume', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add more controller methods as needed 