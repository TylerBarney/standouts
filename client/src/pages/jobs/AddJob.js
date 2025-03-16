import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

const AddJob = ({ newJob, jobDepartments, jobLevels, addJob, setNewJob }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom color="black">
        Add a New Job
      </Typography>

      {/* Form Section */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Title"
              variant="outlined"
              value={newJob.title}
              fullWidth
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Description"
              variant="outlined"
              value={newJob.description}
              fullWidth
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
            />
          </Grid>

          {/* Department */}
          <Grid item xs={12} sm={3}>
            <Select
              displayEmpty
              value={newJob.department_id}
              fullWidth
              onChange={(e) =>
                setNewJob({ ...newJob, department_id: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                Department
              </MenuItem>
              {jobDepartments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Level */}
          <Grid item xs={12} sm={3}>
            <Select
              displayEmpty
              value={newJob.position_level}
              fullWidth
              onChange={(e) =>
                setNewJob({ ...newJob, position_level: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                Level
              </MenuItem>
              {jobLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={addJob}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddJob;
