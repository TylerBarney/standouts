import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Box,
  Container,
  Button,
  Grid,
  useTheme,
} from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.main">
          Welcome to <strong>StandOut</strong>
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Get started...
        </Typography>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          {/* Employee Resumes Paper */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 2,
                borderTop: `4px solid ${theme.palette.secondary.main}`, // Bright blue top border
              }}
            >
              <Typography variant="h2" gutterBottom color="secondary.main">
                Employee Resumes
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Information about what the employee resumes do/are
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/employees")}
                  >
                    Get Started
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button variant="contained" color="secondary">
                    Learn More
                  </Button>
                </Grid> */}
              </Grid>
            </Paper>
          </Grid>

          {/* Applicant Resumes */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 2,
                borderTop: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography variant="h2" gutterBottom color="primary.main">
                Applicant Resumes
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Information about what the applicant resumes do/are and how the
                compatilibites are scored.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                {/* <Grid item>
                  <Button variant="contained" color="primary">
                    Get Started
                  </Button>
                </Grid> */}
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/applicants")}
                  >
                    Learn more
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Job Openings Paper */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 2,
                borderTop: `4px solid ${theme.palette.secondary.main}`, // Bright blue top border
              }}
            >
              <Typography variant="h2" gutterBottom color="secondary.main">
                Job Openings
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Information about how the job openings work
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/jobs")}
                  >
                    Get Started
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button variant="contained" color="secondary">
                    Learn More
                  </Button>
                </Grid> */}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
