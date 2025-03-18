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
} from "@mui/material";
import {
  PeopleAlt as ApplicantsIcon,
  Delete as DeleteIcon,
  DescriptionOutlined as DescriptionIcon,
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

  const { businessId } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

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
                {jobs.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">No jobs found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  jobs.map((job, index) => (
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
