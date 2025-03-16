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
  CircularProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import UploadModal from "./UploadModal";
import {
  getApplicants,
  getJobOpenings,
  addApplicantAPI,
  deleteApplicantAPI,
  downloadApplicantResume,
} from "../../services/api";

const Applicants = () => {
  const location = useLocation();

  const [job_openings, setJobOpenings] = useState([]);

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

  const addApplicant = async (applicant) => {
    try {
      const response = await addApplicantAPI(applicant);
      if (response) {
        response.id = response._id;
        setApplicants([...applicants, response]);
      }
    } catch (error) {
      console.error("Failed to add applicant:", error);
    }
  };

  const handleUploadResumes = () => {
    // make the API call to upload the files to the database
    files.forEach((file, index) => {
      // Simulated data (normally, this comes from the backend)
      const applicant = {
        job_opening_id: selectedJob.id,
        compatibility: 0.8,
        business_id: "67d0daded458795a794012ec",
        resume_pdf: file,
        department_id: selectedJob.department_id,
        position_level: selectedJob.position_level,
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
          job_opening_id: applicant.job_opening_id,
          compatibility: applicant.compatibility,
          name: applicant.name,
          email: applicant.email,
          resume_pdf: applicant.resume_pdf,
          department_id: applicant.department_id,
          position_level: applicant.position_level,
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

    const fetchJobOpenings = async () => {
      try {
        const data = await getJobOpenings(businessId);
        // Add IDs to the objects
        data.forEach((job) => (job.id = job._id));
        // Then set the entire array
        setJobOpenings(data);
      } catch (err) {
        console.error("Failed to fetch job openings:", err);
        setError("Failed to load job openings. Please try again later.");
      }
    };

    fetchApplicants();
    fetchJobOpenings();
  }, [businessId, job]); // Re-fetch if businessId changes

  const deleteApplicant = async (index) => {
    const applicant = applicants[index];
    try {
      const response = await deleteApplicantAPI(applicant.id);
      if (response) {
        setApplicants(applicants.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Failed to delete applicant:", error);
    }
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

  const downloadResume = async (applicantId, applicantName) => {
    try {
      // Get the PDF blob from API
      const pdfBlob = await downloadApplicantResume(applicantId);

      // Replace space with underscore for the filename
      const name = applicantName.replace(/ /g, "_");

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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        {/* Modal for file upload */}
        <UploadModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          files={files}
          setFiles={setFiles}
          job_openings={job_openings}
          selectedJob={selectedJob}
          handleUploadResumes={handleUploadResumes}
          handleJobChange={handleJobChange}
        />
        <Typography variant="h1" gutterBottom color="primary.main">
          Applicants
        </Typography>
        <Paper>
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" gutterBottom color="black">
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
                      applicant.job_opening_id === String(job.id)
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
                            <TableCell>{applicant.job_opening_id}</TableCell>
                            <TableCell>
                              {Math.floor(applicant.compatibility * 100)}%
                            </TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                onClick={() =>
                                  downloadResume(
                                    applicant.id,
                                    applicant.name,
                                    applicant.job_opening_id
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
