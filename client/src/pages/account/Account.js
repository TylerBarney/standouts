import React, { useState } from "react";
import { useAuth } from "../authentication/AuthContext";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";

const Account = () => {
  const { company, companyName, setCompanyName } = useAuth();

  // Mocked username (should be fetched from backend)
  const [username, setUsername] = useState("john.doe");
  const [newCompanyName, setNewCompanyName] = useState(companyName);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // To store the current password
  const [editedPassword, setEditedPassword] = useState(""); // For editing password

  const [isEditingUsername, setIsEditingUsername] = useState(false); // Toggle edit mode for username
  const [editedUsername, setEditedUsername] = useState(username);

  const [isEditingCompanyName, setIsEditingCompanyName] = useState(false); // Toggle edit mode for company name
  const [editedCompanyName, setEditedCompanyName] = useState(newCompanyName);

  const [isEditingPassword, setIsEditingPassword] = useState(false); // Toggle edit mode for password
  const [editedPasswordValue, setEditedPasswordValue] = useState(""); // For editing password text

  const handleUpdate = () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Update company info (mocked, replace with API call)
    const updatedCompany = { ...company, companyName: newCompanyName };
    localStorage.setItem("company", JSON.stringify(updatedCompany));
    setCompanyName(newCompanyName);

    // Handle username update if edited
    if (isEditingUsername) {
      setUsername(editedUsername);
      setIsEditingUsername(false);
    }

    // Handle company name update if edited
    if (isEditingCompanyName) {
      setCompanyName(editedCompanyName);
      setIsEditingCompanyName(false);
    }

    // Handle password update if edited
    if (isEditingPassword && editedPasswordValue) {
      // Save the edited password logic here (mocked)
      alert("Password updated!");
      setPassword(editedPasswordValue); // Save new password
      setIsEditingPassword(false);
    }

    alert("Account information updated!");
  };

  const handleCancelEdit = () => {
    // Cancel the editing and reset the changes
    setEditedUsername(username);
    setEditedCompanyName(companyName);
    setEditedPasswordValue("");
    setIsEditingUsername(false);
    setIsEditingCompanyName(false);
    setIsEditingPassword(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 4, borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <Grid container spacing={2}>
        {/* Editable Company Name */}
        <Grid item xs={12}>
          {isEditingCompanyName ? (
            <TextField
              label="Company Name"
              fullWidth
              value={editedCompanyName}
              onChange={(e) => setEditedCompanyName(e.target.value)}
            />
          ) : (
            <Typography variant="body1">
              <strong>Company Name:</strong> {companyName}{" "}
              <Button
                size="small"
                onClick={() => setIsEditingCompanyName(true)}
              >
                Edit
              </Button>
            </Typography>
          )}
        </Grid>

        {/* Editable Username */}
        <Grid item xs={12}>
          {isEditingUsername ? (
            <TextField
              label="Username"
              fullWidth
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
            />
          ) : (
            <Typography variant="body1">
              <strong>Username:</strong> {username}{" "}
              <Button size="small" onClick={() => setIsEditingUsername(true)}>
                Edit
              </Button>
            </Typography>
          )}
        </Grid>

        {/* Editable Password */}
        <Grid item xs={12}>
          {isEditingPassword ? (
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={editedPasswordValue}
              onChange={(e) => setEditedPasswordValue(e.target.value)}
            />
          ) : (
            <Typography variant="body1">
              <strong>Password:</strong> ***{" "}
              <Button size="small" onClick={() => setIsEditingPassword(true)}>
                Edit
              </Button>
            </Typography>
          )}
        </Grid>

        {/* Password Fields for confirmation */}
        {isEditingPassword && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </>
        )}

        {/* Save Changes Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </Grid>

        {/* Cancel Edit Button */}
        {(isEditingUsername || isEditingCompanyName || isEditingPassword) && (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Account;
