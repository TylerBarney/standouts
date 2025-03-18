import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Tooltip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import {
  PeopleAlt as ApplicantsIcon,
  Delete as DeleteIcon,
  DescriptionOutlined as DescriptionIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import AddJob from "./AddJob";
import DescriptionModal from "./DescriptionModal";
import {
  getJobOpenings,
  addJobOpening,
  deleteJobOpening,
} from "../../services/api";
import { useAuth } from "../authentication/AuthContext";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const { businessId } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  // List of unique departments and levels for filters
  const departments = ["Engineering", "Marketing", "HR", "Sales", "Finance", "BI", "Internship"];
  const levels = ["Manager", "Senior", "Junior", "Entry", "Internship"];

  useEffect(() => {
    const formatJobs = (jobs) => {
      return jobs.map((job) => {
        return {
          id: job._id,
          title: job.title,
          description: job.description,
          department_id: job.department_id,
          position_level: job.position_level,
          business_id: job.business_id,
        };
      });
    };

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getJobOpenings(businessId);
        const dataJobs = formatJobs(data);
        setJobs(dataJobs);
        setFilteredJobs(dataJobs); // Initialize filtered jobs with all jobs
        setError(null);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to load jobs. Please try again later.");
        // Keep any existing jobs in state
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [businessId]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, departmentFilter, levelFilter, idFilter, jobs]);

  const [newJob, setNewJob] = useState({
    id: 0,
    title: "",
    description: "",
    department_id: "",
    position_level: "",
    business_id: businessId,
  });

  // Apply all filters
  const applyFilters = () => {
    let result = [...jobs];

    // Filter by search term (title)
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by ID
    if (idFilter) {
      result = result.filter(job => 
        job.id.includes(idFilter)
      );
    }

    // Filter by department
    if (departmentFilter) {
      result = result.filter(job => 
        job.department_id === departmentFilter
      );
    }

    // Filter by level
    if (levelFilter) {
      result = result.filter(job => 
        job.position_level === levelFilter
      );
    }

    setFilteredJobs(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setIdFilter("");
    setDepartmentFilter("");
    setLevelFilter("");
  };

  // This will need to add the job to the database
  const addJob = async () => {
    if (newJob.title.trim() && newJob.description.trim()) {
      const response = await addJobOpening(newJob);
      if (response) {
        response.id = response._id;
        setJobs([...jobs, response]);
      } else {
        console.log("Job not added");
      }
      setNewJob({
        id: 0,
        title: "",
        description: "",
        department_id: "",
        position_level: "",
        business_id: businessId,
      });
    }
  };

  // This will need to delete the job from the database
  const deleteJob = async (index) => {
    const jobToDelete = filteredJobs[index];
    const jobIndex = jobs.findIndex(job => job.id === jobToDelete.id);
    
    if (jobIndex !== -1) {
      const response = await deleteJobOpening(jobToDelete.id);
      if (response) {
        const updatedJobs = [...jobs];
        updatedJobs.splice(jobIndex, 1);
        setJobs(updatedJobs);
      } else {
        console.log("Job not deleted");
      }
    }
  };

  // Open description modal
  const openDescriptionModal = (description, title) => {
    setSelectedDescription(description);
    setSelectedJobTitle(title);
    setDescriptionModalOpen(true);
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 40) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.main">
          Job Openings
        </Typography>
        <Paper elevation={2} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" color="black">
              View Current Jobs
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
            >
              Add Job
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
                disabled={!searchTerm && !idFilter && !departmentFilter && !levelFilter}
              >
                Clear Filters
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {/* Search by title */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Search by Title"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              {/* Search by ID */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Search by ID"
                  variant="outlined"
                  value={idFilter}
                  onChange={(e) => setIdFilter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              {/* Filter by department */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="department-filter-label">Department</InputLabel>
                  <Select
                    labelId="department-filter-label"
                    value={departmentFilter}
                    label="Department"
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All Departments</em>
                    </MenuItem>
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Filter by level */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="level-filter-label">Level</InputLabel>
                  <Select
                    labelId="level-filter-label"
                    value={levelFilter}
                    label="Level"
                    onChange={(e) => setLevelFilter(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All Levels</em>
                    </MenuItem>
                    {levels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            {/* Results count */}
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Typography variant="body2" color="text.secondary">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </Typography>
            </Box>
            
            <Divider sx={{ mt: 3 }} />
          </Box>

          <AddJob
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            newJob={newJob}
            addJob={addJob}
            setNewJob={setNewJob}
          />

          {/* Description Modal */}
          <DescriptionModal 
            open={descriptionModalOpen}
            onClose={() => setDescriptionModalOpen(false)}
            title={selectedJobTitle}
            description={selectedDescription}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Title</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Description</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Department</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Level</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Applicants</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Close</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">
                        {loading ? "Loading jobs..." : "No jobs found matching your filters"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell>{job.id.substring(0, 8)}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'primary.main',
                            }
                          }}
                          onClick={() => openDescriptionModal(job.description, job.title)}
                        >
                          <Tooltip title="Click to view full description">
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {truncateText(job.description, 20)}
                            </Typography>
                          </Tooltip>
                          <DescriptionIcon fontSize="small" color="action" />
                        </Box>
                      </TableCell>
                      <TableCell>{job.department_id}</TableCell>
                      <TableCell>{job.position_level}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() =>
                            navigate("/applicants", { state: { job } })
                          }
                        >
                          <ApplicantsIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => deleteJob(index)}
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

export default Jobs;
