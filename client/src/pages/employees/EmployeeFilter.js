import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const EmployeeFilter = ({ filters, setFilters, departments, levels }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom color="black">
        Filters
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {/* ID Filter */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Employee ID"
              variant="outlined"
              name="id"
              value={filters.id}
              fullWidth
              onChange={handleFilterChange}
            />
          </Grid>

          {/* Name Filter */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={filters.name}
              fullWidth
              onChange={handleFilterChange}
            />
          </Grid>

          {/* Department Filter */}
          <Grid item xs={12} sm={3}>
            <Select
              displayEmpty
              name="department"
              value={filters.department}
              fullWidth
              onChange={handleFilterChange}
            >
              <MenuItem value="" disabled>
                Department
              </MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Level Filter */}
          <Grid item xs={12} sm={3}>
            <Select
              displayEmpty
              name="position_level"
              value={filters.position_level}
              fullWidth
              onChange={handleFilterChange}
            >
              <MenuItem value="" disabled>
                Level
              </MenuItem>
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EmployeeFilter;
