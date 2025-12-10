
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import authService from "../services/authService";
import validation from "../utils/validation";


const AddUserForm = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    pin: "",
    confirmPin: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    // Validate all fields
    const validationErrors = validation.validateSignupForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // try {
    //   const { email, username, pin, phone } = formData;
    //   await authService.signup(username, email, pin, phone);

    //   alert("User added!");
    //   onSuccess();
    //   onClose();
    // } catch (err) {
    //   alert(err.message || "Error adding user");
    // }
    try {
  const { email, username, pin, phone } = formData;

  // Signup call returns the newly created user
  const createdUser = await authService.signup(username, email, pin, phone);

  alert("User added!");

  // Pass the new user to parent
  onSuccess(createdUser);
  onClose();
} catch (err) {
  alert(err.message || "Error adding user");
}

  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
        
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
              <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="4 Digit PIN"
            name="pin"
            type="password"
            inputProps={{ maxLength: 4 }}
            value={formData.pin}
            onChange={handleChange}
            error={!!errors.pin}
            helperText={errors.pin}
          />

          <TextField
            label="Confirm PIN"
            name="confirmPin"
            type="password"
            inputProps={{ maxLength: 4 }}
            value={formData.confirmPin}
            onChange={handleChange}
            error={!!errors.confirmPin}
            helperText={errors.confirmPin}
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserForm;
