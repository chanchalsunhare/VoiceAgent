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

const AddUserForm = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        pin: "",
        phone: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            const { email, username, pin, phone } = formData;
            await authService.signup(username, email, pin, phone);

            alert("User added!");
            onSuccess();
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
                        label="4 Digit PIN"
                        name="pin"
                        type="number"
                        inputProps={{ maxLength: 4 }}
                        value={formData.pin}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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
