import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { getApplicants } from "../../services/api";

const Applicants = () => {
  const location = useLocation();
  const jobIds = ["1", "2", "3", "4", "5"];

  const [job, setJob] = React.useState(location.state?.job || undefined);
  const [expandedRows, setExpandedRows] = React.useState({});

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

  const addApplicant = (applicant) => {
    setApplicants([...applicants, applicant]);
  };

  const handleUploadResumes = () => {
    // make the API call to upload the files to the database
    files.forEach((file, index) => {
      // Simulated data (normally, this comes from the backend)
      const applicant = {
        jobID: selectedJob,
        compatibility: 0.8,
        name: file.name.replace(".pdf", ""),
        email: "fakeEmail123@gmail.com",
      };

      // Add the applicant to the frontend
      addApplicant(applicant);
    });

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

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Temporary business ID - in a real app, this would come from auth context or similar
  const businessId = "67d0daded458795a794012ec"; // This would typically be the logged-in business's ID

  // Fetch applicants when component mounts
  useEffect(() => {
    const formatApplicants = (applicants) => {
      return applicants.map((applicant) => {
        return {
          id: applicant._id,
          jobID: applicant.job_opening_id,
          compatibility: applicant.match_score,
          name: applicant.name,
          email: applicant.email,
          resume_url: applicant.resume_url,
        };
      });
    };

    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const data = await getApplicants(businessId);
        const dataApplicants = formatApplicants(data);
        console.log("Applicants", dataApplicants);
        setApplicants(dataApplicants);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
        setError("Failed to load applicants. Please try again later.");
        // Keep any existing applicants in state
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [businessId, job]); // Re-fetch if businessId changes

  const deleteApplicant = (index) => {
    // In a real app, you would call an API to delete the applicant
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

  const downloadResume = (applicantName, jobID) => {
    try {
      // Replace space with underscore
      const name = applicantName.replace(/ /g, "_");

      // Simulated byte array (normally, this comes from the backend)
      const fakeByteArray = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in bytes
      const blob = new Blob([fakeByteArray], { type: "application/pdf" });

      // Create a link to trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `job${jobID}_${name}_Resume.pdf`; // Set download filename
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

  // Render loading state
  if (loading && applicants.length === 0) {
    return (
      <Container>
        <Box
          my={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

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
              {/* Close Button (X) */}
              <IconButton
                onClick={() => setOpenModal(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "text.primary", // You can change the color here
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h5" gutterBottom>
                Upload Resumes
              </Typography>

              {/* Job ID Dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="job-id-select-label">Select Job ID</InputLabel>
                <Select
                  labelId="job-id-select-label"
                  id="job-id-select"
                  value={selectedJob}
                  label="Select Job ID"
                  onChange={handleJobChange}
                >
                  {jobIds.map((jobId) => (
                    <MenuItem key={jobId} value={jobId}>
                      {jobId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  fullWidth
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={handleFileChange}
                  sx={{ marginBottom: 2 }}
                />
              </FormControl>
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
                {applicants.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">
                        No applicants found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  applicants.map((applicant, index) => {
                    if (
                      job === undefined ||
                      applicant.jobID === String(job.id)
                    ) {
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
                                onClick={() =>
                                  downloadResume(
                                    applicant.name,
                                    applicant.jobID
                                  )
                                }
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
                                        <strong>Email:</strong>{" "}
                                        {applicant.email}
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
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Applicants;
