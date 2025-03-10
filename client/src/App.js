import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import About from './pages/About';

// Create a custom theme with the Coolors color palette
// F1DEDE - Light pink (background)
// D496A7 - Mauve pink (secondary)
// 5D576B - Dark purple (primary dark)
// 6CD4FF - Bright blue (primary)
// FE938C - Salmon (accent)
const theme = createTheme({
  palette: {
    primary: {
      main: '#6CD4FF', // Bright blue
      light: '#92E0FF', // Lighter blue
      dark: '#5D576B', // Dark purple
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D496A7', // Mauve pink
      light: '#E6B9C6',
      dark: '#B47487',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff', // Changed from light pink to white
      paper: '#ffffff',
    },
    text: {
      primary: '#5D576B', // Dark purple
      secondary: '#7A7488', // Lighter purple
    },
    accent: {
      main: '#FE938C', // Salmon
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      marginBottom: '1rem',
      color: '#5D576B', // Dark purple
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      marginBottom: '1rem',
      color: '#6CD4FF', // Bright blue
    },
    body1: {
      fontSize: '1rem',
      color: '#5D576B', // Dark purple
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: '#6CD4FF', // Bright blue
          '&:hover': {
            backgroundColor: '#5D576B', // Dark purple on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#D496A7', // Mauve pink
          '&:hover': {
            backgroundColor: '#FE938C', // Salmon on hover
          },
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
