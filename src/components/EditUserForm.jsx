
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

const EditUserForm = ({ open, onClose, user, onSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        phone: "",
        status: "active",
    });

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

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSave = async () => {
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
                    />

                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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

