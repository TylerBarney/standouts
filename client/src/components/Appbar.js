import React from "react";
import { useAuth } from "../pages/authentication/AuthContext";

import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";

const Appbar = () => {
  const navigate = useNavigate();
  const { companyName, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {companyName ? `Welcome, ${companyName}` : "Welcome"}
        </Typography>
        <Button color="inherit" onClick={() => navigate("/account")}>
          <AccountCircleIcon />
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
