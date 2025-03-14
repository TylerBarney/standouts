import { cardActionAreaClasses } from "@mui/material";
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Example API methods
export const testApi = async () => {
  try {
    const response = await api.get("/test");
    return response.data;
  } catch (error) {
    console.error("Error testing API:", error);
    throw error;
  }
};

// Add more API methods as needed
export const getBusinessInfo = async (businessId) => {
  try {
    const response = await api.get(`/business/${businessId}/info`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business info:", error);
    throw error;
  }
};

export const getBusinessInfoByEmail = async (email) => {
  try {
    const response = await api.get(`/business/info/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business info by email:", error);
    throw error;
  }
};

export const addBusiness = async (businessData) => {
  try {
    const response = await api.post("/business", businessData);
    return response.data;
  } catch (error) {
    console.error("Error adding business:", error);
    throw error;
  }
};

export const getJobOpenings = async (businessId) => {
  try {
    const response = await api.get(`/business/${businessId}/job-openings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job openings:", error);
    throw error;
  }
};

export const addJobOpening = async (jobOpeningData) => {
  try {
    const response = await api.post("/job-openings", jobOpeningData);
    return response.data;
  } catch (error) {
    console.error("Error adding job opening:", error);
    throw error;
  }
};

export const deleteJobOpening = async (jobOpeningId) => {
  try {
    const response = await api.delete(`/job-openings/${jobOpeningId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job opening:', error);
    throw error;
  }
};


export const getApplicants = async (businessId) => {
  try {
    const response = await api.get(`/business/${businessId}/applicants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error;
  }
};

export const addApplicantAPI = async (applicantData) => {
  console.log("Adding applicant:", applicantData);
  try {
    const response = await api.post("/applicants", applicantData);
    return response.data;
  } catch (error) {
    console.error("Error adding applicant:", error);
    throw error;
  }
};

export const deleteApplicantAPI = async (applicantId) => {
  try {
    const response = await api.delete(`/applicants/${applicantId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting applicant:', error);
    throw error;
  }
};


export const getEmployees = async (businessId) => {
  try {
    const response = await api.get(`/business/${businessId}/employees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addEmployeeAPI = async (employeeData) => {
  try {
    const response = await api.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const deleteEmployeeAPI = async (employeeId) => {
  try {
    const response = await api.delete(`/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export default api;
