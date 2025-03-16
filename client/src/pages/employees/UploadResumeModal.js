import React from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Cancel as CancelIcon, Close as CloseIcon } from "@mui/icons-material";

const UploadResumeModal = ({
  openModal,
  selectedLevel,
  handleLevelChange,
  selectedDepartment,
  handleDepartmentChange,
  handleFileChange,
  removeFile,
  files,
  handleUploadResumes,
  setOpenModal,
}) => {
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
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #222",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Close Button (X) */}
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.primary", // You can change the color here
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom>
            Upload Resumes
          </Typography>

          {/* Level Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="level-select">Select Level</InputLabel>
            <Select
              labelId="level-select"
              id="level-select"
              value={selectedLevel}
              label="Select Level"
              onChange={handleLevelChange}
            >
              {jobLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Department Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="department-select">Select Department</InputLabel>
            <Select
              labelId="department-select"
              id="department-select"
              value={selectedDepartment}
              label="Select Department"
              onChange={handleDepartmentChange}
            >
              {jobDepartments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              fullWidth
              type="file"
              inputProps={{ multiple: true }}
              onChange={handleFileChange}
              sx={{ marginBottom: 2 }}
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={handleUploadResumes}
            color="primary"
          >
            Upload Files
          </Button>

          {/* Display uploaded files with remove option */}
          <Box mt={2}>
            {files.length > 0 && (
              <Typography variant="body2" gutterBottom>
                Uploaded Files:
              </Typography>
            )}
            <ul>
              {files.map((file, index) => (
                <li
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="body2"
                    style={{
                      flexGrow: 1,
                      overflow: "hidden", // Ensure content doesn't overflow
                      textOverflow: "ellipsis", // Apply ellipsis when text overflows
                      whiteSpace: "nowrap", // Prevent wrapping
                      display: "block", // Make sure it behaves like a block-level element for wrapping
                      width: "100%",
                    }}
                  >
                    {file.name}
                  </Typography>
                  <IconButton
                    color="secondary"
                    onClick={() => removeFile(index)}
                    aria-label="remove file"
                  >
                    <CancelIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UploadResumeModal;
