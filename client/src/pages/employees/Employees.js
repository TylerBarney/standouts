import React from "react";
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
} from "../../services/api";
import UploadResumeModal from "./UploadResumeModal";

const Employees = () => {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const businessId = "67d0daded458795a794012ec"; // This would typically be the logged-in business's ID

  React.useEffect(() => {
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

  const [openModal, setOpenModal] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState("");

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
    const employee = employees[index];
    const response = await deleteEmployeeAPI(employee.id);
    if (response) {
      setEmployees(employees.filter((_, i) => i !== index));
    } else {
      console.log("Employee not deleted");
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
      <Box my={4}>
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

        <Paper>
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h2" gutterBottom color="primary.main">
              Employee Resumes
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
                    <Typography variant="h6">Remove</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">
                        No employees found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((employee, index) => (
                    <TableRow>
                      <TableCell>{employee.id}</TableCell>
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
