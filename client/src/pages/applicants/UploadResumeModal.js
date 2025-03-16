import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import { Cancel as CancelIcon, Close as CloseIcon } from "@mui/icons-material";

const UploadResumeModal = ({
  openModal,
  setOpenModal,
  files,
  setFiles,
  job_openings,
  selectedJob,
  handleUploadResumes,
  handleJobChange,
}) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
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
            border: "2px solid #000",
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
              color: "text.primary",
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom>
            Upload Resumes
          </Typography>

          {/* Job ID Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="job-id-select-label">Select Job ID</InputLabel>
            <Select
              labelId="job-id-select-label"
              id="job-id-select"
              value={selectedJob}
              label="Select Job ID"
              onChange={handleJobChange}
            >
              {job_openings.map((job_opening) => (
                <MenuItem key={job_opening.id} value={job_opening}>
                  {job_opening.id.substring(0, 8) + " - " + job_opening.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* File Upload */}
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
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
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
