import React from "react";
import { useState } from "react";
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

  // This will need to query the database
  const [jobs, setJobs] = React.useState([
    {
      id: 1,
      title: "Software Engineeing Intern",
      description: "2025 Backend Summer Internship",
      department: "Engineering",
      level: "Intern",
    },
    {
      id: 2,
      title: "Marketing Manager",
      description: "Digital Marketing Manager with 5 years of experience",
      department: "Marketing",
      level: "Manager",
    },
    {
      id: 3,
      title: "Business Intelligence Engineer",
      description:
        "With experience in serach engine optimization and data analysis",
      department: "BI",
      level: "Senior",
    },
  ]);

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
                    <Typography variant="h6">View Applicants</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Close</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job, index) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Jobs;
