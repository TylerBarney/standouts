import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Home as HomeIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  Work as WorkIcon,
  PeopleAlt as ApplicantsIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Add state to track whether the drawer is open or collapsed
  const [open, setOpen] = useState(!isMobile);

  // Toggle drawer between open and closed states
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Determine drawer width based on open state and screen size
  const drawerWidth = isMobile ? 60 : open ? 240 : 68;

  // List of navigation items
  const navItems = [
    { text: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
    { text: "Jobs", path: "/jobs", icon: <WorkIcon /> },
    { text: "Applicants", path: "/applicants", icon: <ApplicantsIcon /> },
    // Add more navigation items as needed
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          pl: 1,
          pt: 2,
          pb: 2,
          height: "calc(100% - 16px)",
          my: 1,
          ml: 1,
          borderRadius: "16px 16px 16px 16px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        {/* Header with logo and toggle button */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "space-between" : "center",
          }}
        >
          {open && !isMobile && (
            <Typography
              variant="h6"
              sx={{
                color: "primary.contrastText",
              }}
            >
              StandOut
            </Typography>
          )}

          {!isMobile && (
            <IconButton
              onClick={toggleDrawer}
              sx={{ color: "primary.contrastText" }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Box>

        <Divider sx={{ bgcolor: "primary.light", opacity: 0.2, mx: 1 }} />

        {/* Navigation Links */}
        <List sx={{ flexGrow: 1, pt: 2, px: 1 }}>
          {navItems.map((item) => (
            <Tooltip
              key={item.text}
              title={!open ? item.text : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  py: 1.5,
                  px: 2,
                  color: "primary.contrastText",
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                  },
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                  mb: 1,
                  justifyContent: open ? "flex-start" : "center",
                  borderRadius: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? theme.palette.secondary.main
                        : theme.palette.primary.contrastText,
                    minWidth: open ? 40 : 24,
                    mr: open ? 2 : "auto",
                    justifyContent: open ? "flex-start" : "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

        {/* Footer */}
        {open && !isMobile && (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              &copy; {new Date().getFullYear()} My App
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Navbar;
