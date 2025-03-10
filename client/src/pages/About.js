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
  Card,
  CardContent,
  Grid,
  useTheme
} from '@mui/material';
import { 
  Code as CodeIcon, 
  Storage as StorageIcon, 
  Web as WebIcon,
  Palette as PaletteIcon,
  DeveloperBoard as DevBoardIcon
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.dark">
          About Us
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          This is a full-stack application built with React and Node.js, featuring 
          Material UI for a beautiful user interface with a custom color palette.
        </Typography>
        
        <Paper 
          elevation={2} 
          sx={{ 
            mt: 5, 
            p: 4, 
            borderRadius: 2,
            borderTop: `4px solid ${theme.palette.accent.main}` // Salmon top border
          }}
        >
          <Typography variant="h2" gutterBottom color="primary.main">
            Tech Stack
          </Typography>
          
          <List sx={{ bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <WebIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="h6" color="primary.dark">
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
            
            <Divider variant="inset" component="li" sx={{ 
              bgcolor: theme.palette.secondary.light,
              opacity: 0.5
            }} />
            
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <CodeIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="h6" color="primary.dark">
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
            
            <Divider variant="inset" component="li" sx={{ 
              bgcolor: theme.palette.secondary.light,
              opacity: 0.5
            }} />
            
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <StorageIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="h6" color="primary.dark">
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
        
        {/* Design Elements Card */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Card 
              raised 
              sx={{
                height: '100%',
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                borderRadius: 2
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PaletteIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h5" color="primary.dark">Design System</Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Our application uses Material UI for a consistent and modern design language.
                  We've customized the theme with a beautiful color palette to create a unique look and feel.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The color palette includes soft pinks, deep purples, bright blues, and warm salmon tones
                  to create a balanced and visually appealing interface.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              raised 
              sx={{
                height: '100%',
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
                borderRadius: 2
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DevBoardIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                  <Typography variant="h5" color="primary.dark">Development</Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  This application was developed using modern JavaScript frameworks and libraries,
                  with a focus on component reusability and responsive design.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The development process included careful planning of the UI/UX, component hierarchy,
                  and state management to ensure a smooth and intuitive user experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 