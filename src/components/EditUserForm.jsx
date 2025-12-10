

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import authService from "../services/authService";
import validation from "../utils/validation";

const EditUserForm = ({ open, onClose, user, onSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        phone: "",
        status: "active",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || "",
                username: user.username || "",
                phone: user.phone || "",
                status: user.is_active ? "active" : "inactive",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Optional: clear error while typing
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSave = async () => {
        const validationErrors = {};

        // Email validation
        const emailCheck = validation.validateEmail(formData.email);
        if (!emailCheck.isValid) validationErrors.email = emailCheck.error;

        // Username validation
        const usernameCheck = validation.validateUsername(formData.username);
        if (!usernameCheck.isValid) validationErrors.username = usernameCheck.error;

        // Phone validation
        const phoneCheck = validation.validatePhone(formData.phone);
        if (!phoneCheck.isValid) validationErrors.phone = phoneCheck.error;

        // Stop if invalid
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const dataToSend = {
                email: formData.email,
                username: formData.username,
                phone: formData.phone,
                is_active: formData.status === "active",
            };

            await authService.updateUser(user._id || user.id, dataToSend);

            onSuccess({
                ...user,
                email: formData.email,
                username: formData.username,
                phone: formData.phone,
                is_active: formData.status === "active",
            });

            alert("User updated!");
            onClose();
        } catch (err) {
            alert(err.message || "Error updating user");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ p: 4 }}>
            <DialogTitle>Edit User</DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>
                    
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserForm;
