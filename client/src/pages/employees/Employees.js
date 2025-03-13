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
  IconButton,
  Modal,
  Fade,
  Backdrop,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { getEmployees } from "../../services/api";

const Employees = () => {
  const jobLevels = ["Manager", "Senior", "Junior", "Entry", "Internship"];
  const jobDepartments = [
    "Engineering",
    "Marketing",
    "HR",
    "Sales",
    "Finance",
    "BI",
    "Internship",
  ];

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
          level: employee.position_level,
          resume: employee.resume,
        };
      });
    };
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await getEmployees(businessId);
        const dataEmployees = formatEmployees(data)
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
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const handleUploadResumes = () => {
    // make the API call to upload the files to the database
    files.forEach((file, index) => {
      // Simulated data (normally, this comes from the backend)
      const resume = {
        resumeID: employees.length + index + 1,
        department: selectedDepartment,
        level: selectedLevel,
        name: file.name.replace(".pdf", ""),
        resume: file.name,
      };

      // Add the resume to the frontend
      addEmployee(resume);
    });

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

  const deleteResume = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const downloadResume = (employeeName) => {
    try {
      // Replace space with underscore
      const name = employeeName.replace(/ /g, "_");

      // Simulated byte array (normally, this comes from the backend)
      const fakeByteArray = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in bytes
      const blob = new Blob([fakeByteArray], { type: "application/pdf" });

      // Create a link to trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `employee_${name}_Resume.pdf`; // Set download filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup the object URL
      URL.revokeObjectURL(url);

      console.log("Resume download triggered.");
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        {/* Modal for file upload */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Upload Resumes
              </Typography>

              <FormControl fullWidth margin="normal">
                {/* Level Dropdown */}
                <InputLabel id="level-select-label">Select Job ID</InputLabel>
                <Select
                  labelId="level-select-label"
                  id="level-select"
                  value={selectedLevel}
                  label="Level"
                  onChange={handleLevelChange}
                >
                  {jobLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>

                {/* Department Dropdown */}
                <InputLabel id="department-select-label">
                  Select Job ID
                </InputLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  value={selectedDepartment}
                  label="Department"
                  onChange={handleDepartmentChange}
                >
                  {jobDepartments.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="file"
                inputProps={{ multiple: true }}
                onChange={handleFileChange}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleUploadResumes}
                color="primary"
              >
                Upload Files
              </Button>

              {/* Display uploaded files with remove option */}
              <Box mt={2}>
                {files.length > 0 && (
                  <Typography variant="body2" gutterBottom>
                    Uploaded Files:
                  </Typography>
                )}
                <ul>
                  {files.map((file, index) => (
                    <li
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography
                        variant="body2"
                        style={{
                          flexGrow: 1,
                          overflow: "hidden", // Ensure content doesn't overflow
                          textOverflow: "ellipsis", // Apply ellipsis when text overflows
                          whiteSpace: "nowrap", // Prevent wrapping
                          display: "block", // Make sure it behaves like a block-level element for wrapping
                          width: "100%",
                        }}
                      >
                        {file.name}
                      </Typography>
                      <IconButton
                        color="secondary"
                        onClick={() => removeFile(index)}
                        aria-label="remove file"
                      >
                        <CancelIcon />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Fade>
        </Modal>

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
                      <Typography variant="body1">No employees found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((employee, index) => (
                    <TableRow>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.level}</TableCell>
                      <TableCell>
                      <Button
                        color="primary"
                        onClick={() => downloadResume(employee.name)}
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
                )))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Employees;
