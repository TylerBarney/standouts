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
} from "@mui/material";
import {
  WorkOutline as WorkOutlineIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";

const Applicants = () => {
  const location = useLocation();

  const [job, setJob] = React.useState(location.state?.job || undefined);

  console.log("Job", job);

  const [applicants, setApplicants] = React.useState([
    {
      jobID: "1",
      similarity: 0.8,
      name: "John Doe",
      email: "johndoe@gmail.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "2",
      similarity: 0.7,
      name: "Jane Doe",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "3",
      similarity: 0.82,
      name: "Aubry Ran",
      email: "johndoe@gmail.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "1",
      similarity: 0.56,
      name: "Tyler Eod",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "3",
      similarity: 0.78,
      name: "Chloe Doe",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "5",
      similarity: 0.12,
      name: "Jacob ",
      email: "johndoe@gmail.com",
      resume: "Resume.pdf",
    },
    {
      jobID: "4",
      similarity: 0.2,
      name: "Olive Doe",
      email: "janey@yahoo.com",
      resume: "Resume.pdf",
    },
  ]);

  const deleteApplicant = (index) => {
    setApplicants(applicants.filter((_, i) => i !== index));
  };

  const viewApplicant = (index) => {
    console.log("View applicant", index);
  };

  const navigateToJobs = () => {
    console.log("Navigate to jobs");
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
          <Button color="primary" onClick={() => navigateToJobs()}>
            <WorkOutlineIcon />
          </Button>
        </Typography>
        <Paper>
          <Box p={2}>
            <Typography variant="h5">Applicants</Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">View Applicant</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Job ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Compatibility</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Download Resume</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applicants.map((applicant, index) => {
                  if (job === undefined || applicant.jobID === String(job.id)) {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() => viewApplicant(index)}
                          >
                            <AddIcon />
                          </Button>
                        </TableCell>
                        <TableCell>{applicant.jobID}</TableCell>
                        <TableCell>{applicant.similarity * 100}%</TableCell>
                        <TableCell>{applicant.name}</TableCell>
                        <TableCell>{applicant.email}</TableCell>
                        <TableCell>
                          <Button>
                            <DownloadIcon />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            color="secondary"
                            onClick={() => deleteApplicant(index)}
                          >
                            <RemoveIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
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
