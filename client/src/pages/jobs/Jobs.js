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
} from "@mui/material";
import {
  PeopleAlt as ApplicantsIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import AddJob from "./AddJob";
import {
  getJobOpenings,
  addJobOpening,
  deleteJobOpening,
} from "../../services/api";
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
    department_id: "",
    position_level: "",
    business_id: businessId,
  });

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
    const job = jobs[index];
    const response = await deleteJobOpening(job.id);
    if (response) {
      setJobs(jobs.filter((_, i) => i !== index));
    } else {
      console.log("Job not deleted");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.main">
          Job Openings
        </Typography>
        <Paper elevation={2} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <AddJob newJob={newJob} addJob={addJob} setNewJob={setNewJob} />

          <Typography variant="h5" gutterBottom color="black">
            View Current Jobs
          </Typography>
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
