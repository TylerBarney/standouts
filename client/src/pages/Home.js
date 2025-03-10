import React from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Container,
  Button,
  Grid,
  useTheme
} from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h1" gutterBottom color="primary.dark">
          Welcome to My App
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          This is the home page of our application with a beautiful custom color palette
          and a collapsible navigation menu.
        </Typography>
        
        {/* Feature Card */}
        <Paper 
          elevation={2} 
          sx={{ 
            mt: 5, 
            p: 4, 
            borderRadius: 2,
            borderTop: `4px solid ${theme.palette.primary.main}` // Bright blue top border
          }}
        >
          <Typography variant="h2" gutterBottom color="primary.main">
            Features
          </Typography>
          <List>
            {[
              'React frontend with routing',
              'Material UI components and theming',
              'Collapsible navigation menu',
              'Node.js backend with Express',
              'MongoDB database connection'
            ].map((item, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <CheckIcon sx={{ color: theme.palette.accent.main }} />
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
          
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item>
              <Button variant="contained" color="primary">
                Get Started
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary">
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Second Card */}
        <Paper 
          elevation={2} 
          sx={{ 
            mt: 4, 
            p: 4, 
            borderRadius: 2,
            borderTop: `4px solid ${theme.palette.secondary.main}` // Mauve pink top border
          }}
        >
          <Typography variant="h2" gutterBottom color="secondary.main">
            Beautiful Color Palette
          </Typography>
          <Typography variant="body1" paragraph>
            Our application uses a thoughtfully selected color palette from Coolors:
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[
              { name: 'Light Pink', hex: '#F1DEDE', desc: 'Background' },
              { name: 'Mauve Pink', hex: '#D496A7', desc: 'Secondary elements' },
              { name: 'Dark Purple', hex: '#5D576B', desc: 'Text and navbar' },
              { name: 'Bright Blue', hex: '#6CD4FF', desc: 'Primary elements' },
              { name: 'Salmon', hex: '#FE938C', desc: 'Accents and highlights' }
            ].map((color, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box 
                  sx={{ 
                    bgcolor: color.hex, 
                    height: 80, 
                    borderRadius: 1,
                    boxShadow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 1.5
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: color.hex === '#F1DEDE' ? '#5D576B' : 'white' }}>
                    {color.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: color.hex === '#F1DEDE' ? '#5D576B' : 'white' }}>
                    {color.hex} - {color.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 