import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import About from './pages/About';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      marginBottom: '1rem',
      color: '#1976d2',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      marginBottom: '1rem',
      color: '#1976d2',
    },
    body1: {
      fontSize: '1rem',
      color: '#212121',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
  spacing: 8, // Base spacing unit (8px)
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          height: '100vh',
          backgroundColor: 'background.default',
          pt: 0.5 // Add a small top padding to the entire app
        }}>
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: { xs: 3, md: 4 },
              ml: 1, // Add some margin to create space between navbar and content
              overflow: 'auto',
              backgroundColor: 'background.default',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* Add more routes here */}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
