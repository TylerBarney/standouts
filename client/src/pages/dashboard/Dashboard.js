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
          Welcome to <strong>Standout</strong>
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
                Enter current employee resumes to test the compatibility with potential future candidates 
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
                Enter applicant resumes to test the compatibility with current employees
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
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
                Enter current job openings for your company
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
