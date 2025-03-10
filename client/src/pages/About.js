import React from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Container,
  useTheme
} from '@mui/material';
import { Code as CodeIcon, Storage as StorageIcon, Web as WebIcon } from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.main">
          About Us
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          This is a full-stack application built with React and Node.js, featuring 
          Material UI for a beautiful user interface and a collapsible navigation menu.
        </Typography>
        
        <Paper elevation={2} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <Typography variant="h2" gutterBottom color="primary.main">
            Tech Stack
          </Typography>
          
          <List sx={{ bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <WebIcon sx={{ color: theme.palette.secondary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="h6" color="primary.main">
                    Frontend
                  </Typography>
                }
                secondary={
                  <Box component="span" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                    React, React Router, Material UI for components and theming
                  </Box>
                }
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <CodeIcon sx={{ color: theme.palette.secondary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="h6" color="primary.main">
                    Backend
                  </Typography>
                }
                secondary={
                  <Box component="span" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                    Node.js with Express for API development and server-side logic
                  </Box>
                }
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <StorageIcon sx={{ color: theme.palette.secondary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="h6" color="primary.main">
                    Database
                  </Typography>
                }
                secondary={
                  <Box component="span" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                    MongoDB with Mongoose ODM for data modeling and persistence
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default About; 