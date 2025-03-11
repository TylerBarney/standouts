import React from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useTheme,
} from "@mui/material";
import { CheckCircle as CheckIcon } from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.main">
          Welcome to StandOut
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          We need to figure out what kinds of things would be here.
        </Typography>

        <Paper elevation={2} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <Typography variant="h2" gutterBottom color="primary.main">
            Random Paper Element
          </Typography>
          <List>
            {[
              "React frontend with routing",
              "Material UI components and theming",
              "Collapsible navigation menu",
              "Node.js backend with Express",
              "MongoDB database connection",
            ].map((item, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <CheckIcon sx={{ color: theme.palette.secondary.main }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" color="text.primary">
                      {item}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
