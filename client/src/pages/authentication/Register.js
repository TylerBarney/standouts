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

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!companyName || !username || !password) {
      setError("Please enter a company name, username, and password");
      return;
    }
    const companyData = { username, companyName };

    // Simulate a register process (e.g., call API)
    // You can replace the below logic with actual authentication logic
    /* CHECK IF USERNAME ALREADY EXISTS IN DATABASE */
    if (username != "test") {
      login(companyData);
      navigate("/dashboard");
    } else {
      setError("Invalid username");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "100px" }}>
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

          {/* Username input */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
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
