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
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

const EmployeeFilter = ({ filters, setFilters, departments, levels, filteredCount, totalCount }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      name: "",
      id: "",
      department: "",
      position_level: "",
    });
  };

  // Check if any filters are active
  const hasActiveFilters = 
    filters.name !== "" || 
    filters.id !== "" || 
    filters.department !== "" || 
    filters.position_level !== "";

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <FilterIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">Filters</Typography>
        <Box flexGrow={1} />
        <Button 
          size="small" 
          startIcon={<ClearIcon />} 
          onClick={resetFilters}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </Button>
      </Box>
      
      <Grid container spacing={2}>
        {/* ID Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by ID"
            variant="outlined"
            name="id"
            value={filters.id}
            fullWidth
            onChange={handleFilterChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Name Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by Name"
            variant="outlined"
            name="name"
            value={filters.name}
            fullWidth
            onChange={handleFilterChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Department Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="department-filter-label">Department</InputLabel>
            <Select
              labelId="department-filter-label"
              name="department"
              value={filters.department}
              label="Department"
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>All Departments</em>
              </MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Level Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="level-filter-label">Level</InputLabel>
            <Select
              labelId="level-filter-label"
              name="position_level"
              value={filters.position_level}
              label="Level"
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>All Levels</em>
              </MenuItem>
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      {/* Results count */}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Typography variant="body2" color="text.secondary">
          Showing {filteredCount || 0} of {totalCount || 0} employees
        </Typography>
      </Box>
      
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};

export default EmployeeFilter;
