import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

// Components
import Navbar from "./components/Navbar";
import Appbar from "./components/Appbar";
import ConnectionTest from "./ConnectionTest";

// Authentication
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ProtectedRoute from "./pages/authentication/ProtectedRoute";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Jobs from "./pages/jobs/Jobs";
import Applicants from "./pages/applicants/Applicants";
import Employees from "./pages/employees/Employees";
import Account from "./pages/account/Account";
import { AuthProvider, useAuth } from "./pages/authentication/AuthContext";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#074F57",
      light: "#077187",
      dark: "#053D42",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#74A57F",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F9F6F2",
      paper: "#ffffff", 
    },
    text: {
      primary: "#212121",
      secondary: "#4A4A4A",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", Arial, sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      marginBottom: "1rem",
      color: "#1976d2",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      marginBottom: "1rem",
      color: "#1976d2",
    },
    body1: {
      fontSize: "1rem",
      color: "#212121",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 8px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
  spacing: 8, // Base spacing unit (8px)
});

function AppContext() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          backgroundColor: "background.default",
          pt: 0.5, // Add a small top padding to the entire app
        }}
      >
        {isAuthenticated && <Navbar />}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 3, md: 4 },
            ml: 1, // Add some margin to create space between navbar and content
            overflow: "auto",
            backgroundColor: "background.default",
          }}
        >
          {isAuthenticated && <Appbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test-connection" element={<ConnectionTest />} />

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/account" element={<Account />} />
              {/* Add more routes here */}
            </Route>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContext />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
