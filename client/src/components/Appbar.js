import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

const Appbar = () => {
  const userName = "John Doe";

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome, {userName}
        </Typography>
        <Button color="inherit">
          <PersonIcon />
        </Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
