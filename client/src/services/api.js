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
    console.error("Error deleting job opening:", error);
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
    // Create a FormData object for file uploads
    const formData = new FormData();

    // Check if the resume_pdf is actually a File object
    if (!(applicantData.resume_pdf instanceof File)) {
      console.error(
        "resume_pdf is not a File object:",
        applicantData.resume_pdf
      );
      throw new Error("resume_pdf must be a File object");
    }

    // Add the resume file with the field name the server expects
    formData.append("resume_pdf", applicantData.resume_pdf);

    // Add all other applicant data as form fields
    Object.keys(applicantData).forEach((key) => {
      if (key !== "resume_pdf") {
        formData.append(key, applicantData[key]);
      }
    });

    // Need to send multipart/form-data to get file upload to work
    const response = await api.post("/applicants", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding applicant:", error);
    throw error;
  }
};

export const addApplicantsBatchAPI = async (applicantsData) => {
  console.log("Adding applicants in batch:", applicantsData.length);
  try {
    // Create a FormData object for file uploads
    const formData = new FormData();

    const applicantsMetadata = []

    // For each applicant in the batch
    applicantsData.forEach((applicantData, index) => {
      // Check if the resume_pdf is actually a File object
      if (!(applicantData.resume_pdf instanceof File)) {
        console.error(`resume_pdf for applicant ${index} is not a File object:`, applicantData.resume_pdf);
        throw new Error(`resume_pdf for applicant ${index} must be a File object`);
      }

      formData.append('resume_pdfs', applicantData.resume_pdf);

      const metadata = { ...applicantData }
      delete metadata.resume_pdf
      applicantsMetadata.push(metadata)
    });

    formData.append('applicants_metadata', JSON.stringify(applicantsMetadata));

    const response = await api.post("/applicants/batch", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding applicants in batch:", error);
    throw error;
  }
};



export const deleteApplicantAPI = async (applicantId) => {
  try {
    const response = await api.delete(`/applicants/${applicantId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting applicant:", error);
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
    // Create a FormData object for file uploads
    const formData = new FormData();

    // Check if the resume_pdf is actually a File object
    if (!(employeeData.resume_pdf instanceof File)) {
      console.error(
        "resume_pdf is not a File object:",
        employeeData.resume_pdf
      );
      throw new Error("resume_pdf must be a File object");
    }

    // Add the resume file with the field name the server expects
    formData.append("resume_pdf", employeeData.resume_pdf);

    // Add all other applicant data as form fields
    Object.keys(employeeData).forEach((key) => {
      if (key !== "resume_pdf") {
        formData.append(key, employeeData[key]);
      }
    });

    // Need to send multipart/form-data to get file upload to work
    const response = await api.post("/employees", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const downloadApplicantResume = async (applicantId) => {
  try {
    const response = await api.get(`/applicants/${applicantId}/resume`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading applicant resume:", error);
    throw error;
  }
};

export const downloadEmployeeResume = async (employeeId) => {
  try {
    const response = await api.get(`/employees/${employeeId}/resume`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading employee resume:", error);
    throw error;
  }
};

export const sendUploadedEmployeeResumes = async (
  files,
  department,
  level,
  businessId
) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("resumes", file);
    });
    formData.append("level", level);
    formData.append("department", department);
    formData.append("businessId", businessId);

    const response = await api.post("/email-employee-resumes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending uploaded resumes:", error);
    throw error;
  }
};

export const sendUploadedApplicantResumes = async (
  files,
  jobId,
  department,
  level,
  businessId
) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("resumes", file);
    });
    formData.append("jobId", jobId);
    formData.append("level", level);
    formData.append("department", department);
    formData.append("businessId", businessId);

    const response = await api.post("/email-applicant-resumes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending uploaded resumes:", error);
    throw error;
  }
};

export default api;
