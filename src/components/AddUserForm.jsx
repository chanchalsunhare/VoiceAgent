
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import authService from "../services/authService";
import validation from "../utils/validation";
import toast from "react-hot-toast";

const AddUserForm = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    pin: "",
    confirmPin: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const validationErrors = validation.validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { email, username, pin, phone } = formData;
      const createdUser = await authService.signup(username, email, pin, phone);

      // alert("User added!");
       toast.success('User added successfully!');
      onSuccess(createdUser);
      onClose();
    } catch (err) {
       toast.error(err.message)
       console.log("userError", err.message);
      // alert(err.message || "Error adding user");
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

          {/* PIN Field with eye icon */}
          <TextField
            label="4 Digit PIN"
            name="pin"
            type={showPin ? "text" : "password"}
            inputProps={{ maxLength: 4 }}
            value={formData.pin}
            onChange={handleChange}
            error={!!errors.pin}
            helperText={errors.pin}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                   sx={{ color: "#28a745" }}
                  onClick={() => setShowPin(!showPin)} edge="end">
                    {showPin ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm PIN Field with eye icon */}
          <TextField
            label="Confirm PIN"
            name="confirmPin"
            type={showConfirmPin ? "text" : "password"}
            inputProps={{ maxLength: 4 }}
            value={formData.confirmPin}
            onChange={handleChange}
            error={!!errors.confirmPin}
            helperText={errors.confirmPin}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                     sx={{ color: "#28a745" }}
                    edge="end"
                  >
                    {showConfirmPin ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

