import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import {
  getEmployees,
  addEmployeeAPI,
  deleteEmployeeAPI,
  downloadEmployeeResume,
  sendUploadedEmployeeResumes,
} from "../../services/api";
import UploadResumeModal from "./UploadResumeModal";
import EmployeeFilter from "./EmployeeFilter";
import { useAuth } from "../authentication/AuthContext";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    id: "",
    department: "",
    position_level: "",
  });

  const { businessId } = useAuth();

  // Extract unique department and level options from employees
  const departments = [...new Set(employees.map((e) => e.department))];
  const levels = [...new Set(employees.map((e) => e.position_level))];

  // Filter employees based on the selected filters
  const filteredEmployees = employees.filter((employee) => {
    return (
      (filters.name === "" ||
        employee.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.id === "" || employee.id.includes(filters.id)) &&
      (filters.department === "" ||
        employee.department === filters.department) &&
      (filters.position_level === "" ||
        employee.position_level === filters.position_level)
    );
  });

  useEffect(() => {
    const formatEmployees = (employees) => {
      return employees.map((employee) => {
        return {
          id: employee._id,
          name: employee.name,
          department: employee.department,
          position_level: employee.position_level,
          resume_pdf: employee.resume_pdf,
        };
      });
    };
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await getEmployees(businessId);
        const dataEmployees = formatEmployees(data);
        setEmployees(dataEmployees);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to load employees. Please try again later.");
        // Keep any existing employees in state
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [businessId]);

  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  //Remove file from import
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  //Add a resume to the frontend setResumes hook
  const addEmployee = async (employee) => {
    const response = await addEmployeeAPI(employee);
    console.log("Response", response);
    if (response) {
      console.log("Employee", response);
      response.id = response._id;
      setEmployees([...employees, response]);
    } else {
      console.log("Employee not added");
    }
  };

  const emailEmployeeResumesToSelf = async () => {
    if (files.length === 0) {
      console.log("No resumes imported, no email sent.");
      return;
    }

    try {
      await sendUploadedEmployeeResumes(
        files,
        selectedDepartment,
        selectedLevel,
        businessId
      );
      console.log("Email sent with uploaded resumes!");
    } catch (error) {
      console.log("Failed to send email.");
    }
  };

  const handleUploadResumes = async () => {
    // make the API call to upload the files to the database
    const uploadPromises = files.map((file) => {
      const resume = {
        department: selectedDepartment,
        position_level: selectedLevel,
        resume_pdf: file,
        business_id: businessId,
      };

      // Add the resume to the frontend and return the promise
      return addEmployee(resume);
    });

    // Send email with the employee resume information
    emailEmployeeResumesToSelf();

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    console.log("Uploading files...", files);
    setOpenModal(false); //Close modal after upload

    // Clear the files after upload
    setFiles([]);
    // Clear selected level and department
    setSelectedDepartment("");
    setSelectedLevel("");
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const deleteResume = async (index) => {
    const employee = filteredEmployees[index];
    const employeeIndex = employees.findIndex((emp) => emp.id === employee.id);

    if (employeeIndex !== -1) {
      const response = await deleteEmployeeAPI(employee.id);
      if (response) {
        const updatedEmployees = [...employees];
        updatedEmployees.splice(employeeIndex, 1);
        setEmployees(updatedEmployees);
      } else {
        console.log("Employee not deleted");
      }
    }
  };

  const downloadResume = async (employeeId, employeeName) => {
    try {
      // Get the PDF blob from API
      const pdfBlob = await downloadEmployeeResume(employeeId);

      // Replace space with underscore for the filename
      const name = employeeName.replace(/ /g, "_");

      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up
      URL.revokeObjectURL(url);
      console.log("Resume download completed successfully.");
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.main">
          Employees
        </Typography>

        {/* Modal for file upload */}
        <UploadResumeModal
          openModal={openModal}
          selectedLevel={selectedLevel}
          handleLevelChange={handleLevelChange}
          selectedDepartment={selectedDepartment}
          handleDepartmentChange={handleDepartmentChange}
          handleFileChange={handleFileChange}
          removeFile={removeFile}
          files={files}
          handleUploadResumes={handleUploadResumes}
          setOpenModal={setOpenModal}
        />

        <Paper elevation={2} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" color="black">
              Resumes
            </Typography>

            {/* Button to open file upload modal */}
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
            >
              Upload Resumes
            </Button>
          </Box>

          {/* Employee Filter Section */}
          <EmployeeFilter
            filters={filters}
            setFilters={setFilters}
            departments={departments}
            levels={levels}
            filteredCount={filteredEmployees.length}
            totalCount={employees.length}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Department</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Level</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Resume</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Delete</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1">
                        {loading
                          ? "Loading employees..."
                          : "No employees found matching your filters"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell>{employee.id.substring(0, 8)}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position_level}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() =>
                            downloadResume(employee.id, employee.name)
                          }
                        >
                          <DownloadIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => deleteResume(index)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Employees;
