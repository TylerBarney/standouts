/**
 * Database Models
 * This file contains all the Mongoose schemas and models for the application
 */

const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  resume_pdf: {
    type: Buffer,
    required: true
  },
  resume_pdf_filename: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  position_level: {
    type: String,
    required: true
  },
});

const ApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  job_opening_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOpening',
    required: true
  },
  resume_pdf: {
    type: Buffer,
    required: true
  },
  resume_pdf_filename: {
    type: String,
    required: true
  },
  department_id: {
    type: String,
    required: true
  },
  position_level: {
    type: String,
    required: true
  },
  compatibility: {
    type: Number,
    required: false
  }
});

const JobOpeningSchema = new mongoose.Schema({
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  department_id: {
    type: String,
    required: true
  },
  position_level: {
    type: String,
    required: true
  }
});

module.exports = {
  Business: mongoose.model('Business', BusinessSchema),
  Employee: mongoose.model('Employee', EmployeeSchema),
  Applicant: mongoose.model('Applicant', ApplicantSchema),
  JobOpening: mongoose.model('JobOpening', JobOpeningSchema)
}; 