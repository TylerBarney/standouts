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
  WorkOutline as WorkOutlineIcon,
  Delete as DeleteIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const Applicants = () => {
  const location = useLocation();
  const jobIds = ["1", "2", "3", "4", "5"];

  const [job, setJob] = React.useState(location.state?.job || undefined);
  const [expandedRows, setExpandedRows] = React.useState({});

  const [applicants, setApplicants] = React.useState([
    {
      jobID: "1",
      compatibility: 0.8,
      name: "John Doe",
      email: "johndoe@gmail.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "2",
      compatibility: 0.7,
      name: "Jane Doe",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "3",
      compatibility: 0.82,
      name: "Aubry Ran",
      email: "johndoe@gmail.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "1",
      compatibility: 0.56,
      name: "Tyler Eod",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "3",
      compatibility: 0.78,
      name: "Chloe Doe",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "5",
      compatibility: 0.12,
      name: "Jacob ",
      email: "johndoe@gmail.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "4",
      compatibility: 0.2,
      name: "Olive Doe",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
  ]);

  const [openModal, setOpenModal] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [selectedJob, setSelectedJob] = React.useState("");

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
    // Clear the selected job after upload
    setSelectedJob("");
  };

  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  const deleteApplicant = (index) => {
    setApplicants(applicants.filter((_, i) => i !== index));
  };

  const viewApplicant = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle dropdown visibility
    }));
  };

  const setJobToUndefined = () => {
    setJob(undefined);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h1" gutterBottom color="primary.main">
          {job === undefined ? (
            "All Applicants"
          ) : (
            <>
              <Button color="primary" onClick={() => setJobToUndefined()}>
                <KeyboardBackspaceIcon />
              </Button>
              Job {job.id}: {job.title}
            </>
          )}
        </Typography>

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

              {/* Job ID Dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="job-id-select-label">Select Job ID</InputLabel>
                <Select
                  labelId="job-id-select-label"
                  id="job-id-select"
                  value={selectedJob}
                  label="Job ID"
                  onChange={handleJobChange}
                >
                  {jobIds.map((jobId) => (
                    <MenuItem key={jobId} value={jobId}>
                      {jobId}
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
            <Typography variant="h5">Applicants</Typography>
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
                    <Typography variant="h6"></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Job ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Compatibility</Typography>
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
                {applicants.map((applicant, index) => {
                  if (job === undefined || applicant.jobID === String(job.id)) {
                    return (
                      <React.Fragment key={index}>
                        <TableRow>
                          <TableCell>
                            <IconButton onClick={() => viewApplicant(index)}>
                              {expandedRows[index] ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>{applicant.name}</TableCell>
                          <TableCell>{applicant.jobID}</TableCell>
                          <TableCell>
                            {Math.floor(applicant.compatibility * 100)}%
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              onClick={() => deleteApplicant(index)}
                            >
                              <DownloadIcon />
                            </Button>
                          </TableCell>

                          <TableCell>
                            <Button
                              color="secondary"
                              onClick={() => deleteApplicant(index)}
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>

                        {/* Expandable Row with More Details */}
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                          >
                            <Collapse
                              in={expandedRows[index]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box margin={2}>
                                <Typography variant="body1">
                                  <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <Box>
                                      <strong>Email:</strong> {applicant.email}
                                    </Box>
                                  </Box>
                                </Typography>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Applicants;
