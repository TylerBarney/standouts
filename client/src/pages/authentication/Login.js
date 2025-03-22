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
import { getBusinessInfoByEmail } from "../../services/api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!inputEmail || !inputPassword) {
      setError("Please enter both inputEmail and inputPassword");
      return;
    }

    try {
      const { _id, name, password } = await getBusinessInfoByEmail(inputEmail);

      if (inputPassword !== password) {
        setError("Invalid inputEmail or inputPassword");
        return;
      }

      console.log("pass!: ", inputPassword);

      const businessData = { inputEmail, companyName: name, businessId: _id };

      login(businessData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password");
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
            Login
          </Typography>

          {/* Error message */}
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}

          {/* inputEmail input */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            type="inputEmail"
          />

          {/* inputPassword input */}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputPassword}
            onChange={(e) => setPassword(e.target.value)}
            type="inputPassword"
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
