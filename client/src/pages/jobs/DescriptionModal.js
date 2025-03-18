import React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
} from "@mui/icons-material";

const DescriptionModal = ({ open, onClose, title, description }) => {
  // Modal style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" color="black">
            {title} - Description
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default DescriptionModal;

