import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddJobModal = ({ open, onClose, newJob, addJob, setNewJob }) => {
  const jobLevels = ["Manager", "Senior", "Junior", "Entry", "Internship"];
  const jobDepartments = [
    "Engineering",
    "Marketing",
    "HR",
    "Sales",
    "Finance",
    "BI",
    "Internship",
  ];

  const handleSubmit = () => {
    addJob();
    onClose();
  };

  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" color="black">
            Add a New Job
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Section */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                value={newJob.title}
                fullWidth
                onChange={(e) =>
                  setNewJob({ ...newJob, title: e.target.value })
                }
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                value={newJob.description}
                fullWidth
                multiline
                minRows={3}
                maxRows={10}
                onChange={(e) =>
                  setNewJob({ ...newJob, description: e.target.value })
                }
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddJobModal;
