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

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const companyData = { username, companyName: "Test Company" };

    // Simulate a login process (e.g., call API)
    // You can replace the below logic with actual authentication logic
    if (username === "test" && password === "test") {
      login(companyData);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "100px" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          {/* Error message */}
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}

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

          {/* Login button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: "16px" }}
          >
            Login
          </Button>

          {/* Register link */}
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginTop: "10px" }}
          >
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{" "}
                <Button color="primary" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
