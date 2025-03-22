import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  CssBaseline,
} from "@mui/material";
import { addBusiness } from "../../services/api";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!companyName || !email || !password) {
      setError("Please enter a company name, email, and password");
      return;
    }

    const businessData = {
      name: companyName,
      email: email,
      password: password,
    };

    /* NEED TO CHECK IF EMAIL ALREADY EXISTS IN DATABASE */

    try {
      // Call API to add business
      const businessID = await addBusiness(businessData);

      const localHostData = {
        email,
        companyName,
        businessId: businessID,
      };
      login(localHostData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering business:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        variant="h1"
        gutterBottom
        color="primary.main"
        style={{ marginTop: "50px" }}
      >
        Welcome to <strong>StandOut</strong>
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>

          {/* Error message */}
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}

          {/* Company Name input */}
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type="companyName"
          />

          {/* Email input */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          {/* Password input */}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          {/* Register button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            style={{ marginTop: "16px" }}
          >
            Register
          </Button>

          {/* Login link */}
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginTop: "10px" }}
          >
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                Already have an account?{" "}
                <Button color="primary" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
