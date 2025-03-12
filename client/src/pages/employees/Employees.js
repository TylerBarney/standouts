import React from "react";
import { useLocation } from "react-router-dom";
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
  Collapse,
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
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const Employees = () => {
  const [resumes, setResumes] = React.useState([
    {
      resumeID: "1",
      department: "Engineering",
      level: "Internship",
      name: "John Doe",
    },
    {
      resumeID: "2",
      department: "Marketing",
      level: "Manager",
      name: "Jane Doe",
    },
    {
      resumeID: "3",
      department: "HR",
      level: "Senior",
      name: "Aubry Ran",
    },
    {
      resumeID: "4",
      department: "Sales",
      level: "Junior",
      name: "Tyler Eod",
    },
    {
      resumeID: "5",
      department: "Finance",
      level: "Entry",
      name: "Chloe Doe",
    },
    {
      resumeID: "6",
      department: "BI",
      level: "Internship",
      name: "Jacob ",
    },
    {
      resumeID: "7",
      department: "Finance",
      level: "Manager",
      name: "Olive Doe",
    },
  ]);

  const [openModal, setOpenModal] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  //Remove file from import
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUploadResumes = () => {
    // make the API call to upload the files to the database
    console.log("Uploading files...", files);
    setOpenModal(false); //Close modal after upload

    // Clear the files after upload
    setFiles([]);
  };

  const deleteResume = (index) => {
    setResumes(resumes.filter((_, i) => i !== index));
  };

  const downloadResume = (index) => {
    console.log("Downloading resume...");
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
                {resumes.map((resume, index) => (
                  <TableRow>
                    <TableCell>{resume.resumeID}</TableCell>
                    <TableCell>{resume.name}</TableCell>
                    <TableCell>{resume.department}</TableCell>
                    <TableCell>{resume.level}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        onClick={() => downloadResume(index)}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Employees;
