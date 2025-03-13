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
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import {
  PeopleAlt as ApplicantsIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { getJobOpenings } from "../../services/api";
const Jobs = () => {
  const navigate = useNavigate();
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

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const businessId = "67d0daded458795a794012ec"; // This would typically be the logged-in business's ID

  useEffect(() => {
    const formatJobs = (jobs) => {
      return jobs.map((job) => {
        return {
          id: job._id,
          title: job.title,
          description: job.description,
          department: job.department_id,
          level: job.position_level,
        }
      })
    }

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getJobOpenings(businessId);
        const dataJobs = formatJobs(data)
        setJobs(dataJobs);
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


  const [newJob, setNewJob] = useState({
    id: 0,
    title: "",
    description: "",
    department: "",
    level: "",
  });

  // This will need to add the job to the database
  const addJob = () => {
    if (newJob.title.trim() && newJob.description.trim()) {
      newJob.id = jobs.length + 1;
      setJobs([...jobs, newJob]);
      setNewJob({
        id: 0,
        title: "",
        description: "",
        department: "",
        level: "",
      });
    }
  };

  // This will need to delete the job from the database
  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={2} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <Typography variant="h2" gutterBottom color="primary.main">
            Job Openings
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Title"
              variant="outlined"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
            />
            <Select
              displayEmpty
              value={newJob.department}
              onChange={(e) =>
                setNewJob({ ...newJob, department: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                Department
              </MenuItem>
              {jobDepartments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
            <Select
              displayEmpty
              value={newJob.level}
              onChange={(e) => setNewJob({ ...newJob, level: e.target.value })}
            >
              <MenuItem value="" disabled>
                Level
              </MenuItem>
              {jobLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={addJob}>
              Add
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
                {jobs.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">No jobs found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  jobs.map((job, index) => (
                    <TableRow key={index}>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.description}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.level}</TableCell>
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
                )))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Jobs;
