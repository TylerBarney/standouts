import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Slider,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Percent as PercentIcon,
} from "@mui/icons-material";
import UploadResumeModal from "./UploadResumeModal";
import {
  getApplicants,
  getJobOpenings,
  addApplicantAPI,
  deleteApplicantAPI,
  downloadApplicantResume,
  addApplicantsBatchAPI,
} from "../../services/api";
import { useAuth } from "../authentication/AuthContext";

const Applicants = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [job_openings, setJobOpenings] = useState([]);
  const [job, setJob] = useState(location.state?.job || undefined);
  const [expandedRows, setExpandedRows] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const { businessId } = useAuth();

  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [jobIdFilter, setJobIdFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [compatibilityFilter, setCompatibilityFilter] = useState("all");
  const [filteredApplicants, setFilteredApplicants] = useState([]);

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

  const handleUploadResumes = async () => {
    // make the API call to upload the files to the database
    const applicantsData = files.map((file, index) => {
      return {
        job_opening_id: selectedJob.id,
        compatibility: -1.1,
        business_id: businessId,
        resume_pdf: file,
        department_id: selectedJob.department_id,
        position_level: selectedJob.position_level,
      }
    })

    try {
      const response = await addApplicantsBatchAPI(applicantsData);
      console.log("Applicants added in batch:", response);
      setApplicants([...applicants, ...response]);
    } catch (error) {
      console.error("Failed to add applicants in batch:", error);
    }

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

  // Function to find job name by ID
  const getJobNameById = (jobId) => {
    const job = job_openings.find(job => job.id === jobId);
    return job ? job.title : "Unknown Job";
  };

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [nameFilter, jobIdFilter, emailFilter, compatibilityFilter, applicants, job]);

  // Apply all filters
  const applyFilters = () => {
    let result = [...applicants];

    // If we have a specific job selected, filter by that job first
    if (job !== undefined) {
      result = result.filter(app => app.job_opening_id === String(job.id));
    }

    // Filter by name
    if (nameFilter) {
      result = result.filter(applicant => 
        applicant.name && applicant.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filter by job ID or job name
    if (jobIdFilter) {
      result = result.filter(applicant => {
        // Check if job ID includes the search term
        const jobIdMatch = applicant.job_opening_id && 
                          applicant.job_opening_id.includes(jobIdFilter);
        
        // Check if job name includes the search term
        const jobName = getJobNameById(applicant.job_opening_id);
        const jobNameMatch = jobName && 
                            jobName.toLowerCase().includes(jobIdFilter.toLowerCase());
        
        // Return true if either matches
        return jobIdMatch || jobNameMatch;
      });
    }

    // Filter by email
    if (emailFilter) {
      result = result.filter(applicant => 
        applicant.email && applicant.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    // Filter by compatibility
    if (compatibilityFilter !== "all") {
      if (compatibilityFilter === "processing") {
        // Filter for applicants still in processing
        result = result.filter(applicant => applicant.compatibility === -1.1);
      } else {
        // Parse the range from the string value (e.g., "0-25" becomes [0, 25])
        const [min, max] = compatibilityFilter.split("-").map(Number);
        
        result = result.filter(applicant => {
          // Skip applicants still processing if we're looking for a specific range
          if (applicant.compatibility === -1.1) return false;
          
          const compatPercent = Math.floor(applicant.compatibility * 100);
          return compatPercent >= min && compatPercent <= max;
        });
      }
    }

    setFilteredApplicants(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setNameFilter("");
    setJobIdFilter("");
    setEmailFilter("");
    setCompatibilityFilter("all");
  };

  // Check if any filters are active
  const hasActiveFilters = 
    nameFilter !== "" || 
    jobIdFilter !== "" || 
    emailFilter !== "" || 
    compatibilityFilter !== "all";

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
        setFilteredApplicants(dataApplicants);
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
  }, [businessId]); // Re-fetch if businessId changes

  const deleteApplicant = async (index) => {
    const applicant = filteredApplicants[index];
    const applicantIndex = applicants.findIndex(app => app.id === applicant.id);
    
    if (applicantIndex !== -1) {
      try {
        const response = await deleteApplicantAPI(applicant.id);
        if (response) {
          const updatedApplicants = [...applicants];
          updatedApplicants.splice(applicantIndex, 1);
          setApplicants(updatedApplicants);
        }
      } catch (error) {
        console.error("Failed to delete applicant:", error);
      }
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
        <UploadResumeModal
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
        <Paper elevation={2} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" color="black">
              {job === undefined ? (
                "All Applicants"
              ) : (
                <>
                  <Button color="primary" onClick={() => setJobToUndefined()}>
                    <KeyboardBackspaceIcon />
                  </Button>
                  Job {job.id.substring(0, 8)}: {job.title}
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

          {/* Filter Section */}
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <FilterIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Filters</Typography>
              <Box flexGrow={1} />
              <Button 
                size="small" 
                startIcon={<ClearIcon />} 
                onClick={resetFilters}
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {/* Name Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Search by Name"
                  variant="outlined"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              {/* Job ID Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Search by Job ID/Name"
                  variant="outlined"
                  value={jobIdFilter}
                  onChange={(e) => setJobIdFilter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              {/* Email Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Search by Email"
                  variant="outlined"
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              {/* Compatibility Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="compatibility-filter-label">Compatibility</InputLabel>
                  <Select
                    labelId="compatibility-filter-label"
                    id="compatibility-filter"
                    value={compatibilityFilter}
                    label="Compatibility"
                    onChange={(e) => setCompatibilityFilter(e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="0-25">0-25%</MenuItem>
                    <MenuItem value="26-50">26-50%</MenuItem>
                    <MenuItem value="51-75">51-75%</MenuItem>
                    <MenuItem value="76-100">76-100%</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            {/* Results count */}
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Typography variant="body2" color="text.secondary">
                Showing {filteredApplicants.length} of {applicants.length} applicants
                {job !== undefined ? " for this job" : ""}
              </Typography>
            </Box>
            
            <Divider sx={{ mt: 3 }} />
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
                    <Typography variant="h6">Job</Typography>
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
                {filteredApplicants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">
                        {loading ? "Loading applicants..." : "No applicants found matching your filters"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplicants.map((applicant, index) => (
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
                        <TableCell>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {applicant.job_opening_id.substring(0, 8)} - {getJobNameById(applicant.job_opening_id)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {applicant.compatibility === -1.1
                            ? "Processing..."
                            : `${Math.floor(applicant.compatibility * 100)}%`}
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

export default Applicants;
