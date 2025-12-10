import { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Stack,
    Button as MUIButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    Chip,
} from "@mui/material";

import authService from "../services/authService";
import EditUserForm from "../components/EditUserForm";
import AddUserForm from "../components/AddUserForm";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch all users
    const getUsersFromAPI = async () => {
        try {
            const res = await authService.getAllUsers();
            console.log("res", res);
            // setUsers(res.users || res);
            setUsers((res.users || res).slice().reverse());

        } catch (err) {
            alert(err.message || "Failed to load users");
        }
    };

    useEffect(() => {
        getUsersFromAPI();
    }, []);

    const handleOpenAddForm = () => setOpenAddForm(true);

    const handleOpenEditForm = (user) => {
        setSelectedUser(user);
        setOpenEditForm(true);
    };

    const handleDelete = async (userId, index) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await authService.deleteUser(userId);
            setUsers((prev) => prev.filter((_, i) => i !== index));
        } catch (err) {
            alert(err.message || "Failed to delete user");
        }
    };


    // Status Badge UI
    const StatusChip = ({ status }) => (
        <Chip
            label={status}
            sx={{
                backgroundColor: status === "active" ? "#d1fae5" : "#fee2e2",
                color: status === "active" ? "#065f46" : "#991b1b",
                fontWeight: 700,
                textTransform: "capitalize",
            }}
        />
    );

    return (
        <Box sx={{ minHeight: "100vh", background: "#f3f4f6", pb: 5 }}>
            <Container maxWidth="lg">
                {/* Heading */}
                {/* <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background:
                                "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Admin Console
                    </Typography>

                    <MUIButton
                        variant="contained"
                        onClick={handleOpenAddForm}
                        sx={{
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            background:
                                "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
                        }}
                    >
                        + Add User
                    </MUIButton>
                </Box> */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "center" },
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 2, md: 0 },
                        py: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textAlign: { xs: "center", md: "left" },
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        Admin Console
                    </Typography>

                    <MUIButton
                        variant="contained"
                        onClick={handleOpenAddForm}
                        sx={{
                            px: { xs: 2, md: 3 },
                            py: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            width: { xs: "100%", sm: "fit-content" },
                            background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
                        }}
                    >
                        + Add User
                    </MUIButton>
                </Box>


                {/* Responsive Table */}
                <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
                    <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
                        <Table>
                            <TableHead sx={{ background: "#eaecef" }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {users.map((user, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" },
                                            "&:hover": { backgroundColor: "#eef2ff", cursor: "pointer" },
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            {user.username}
                                        </TableCell>

                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>

                                        {/* Status Dropdown */}
                                        <TableCell>
                                            <StatusChip status={user.is_active ? "active" : "inactive"} />
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <MUIButton
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ borderRadius: 2 }}
                                                    onClick={() => handleOpenEditForm(user)}
                                                >
                                                    Edit
                                                </MUIButton>

                                                <MUIButton
                                                    size="small"
                                                    variant="outlined"
                                                    color="error"
                                                    sx={{ borderRadius: 2 }}
                                                    onClick={() =>
                                                        handleDelete(user._id || user.id, index)
                                                    }
                                                >
                                                    Delete
                                                </MUIButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {/* Add User Form */}
                <AddUserForm
                    open={openAddForm}
                    onClose={() => setOpenAddForm(false)}
                    // onSuccess={getUsersFromAPI}
                    onSuccess={(newUser) => {
                        setUsers((prev) => [newUser, ...prev]);   
                    }}

                />

                {/* Edit User Form */}

                <EditUserForm
                    open={openEditForm}
                    onClose={() => setOpenEditForm(false)}
                    user={selectedUser}
                    onSuccess={(updatedUser) => {
                        setUsers((prevUsers) =>
                            prevUsers.map((u) =>
                                (u._id || u.id) === (updatedUser._id || updatedUser.id)
                                    ? updatedUser
                                    : u
                            )
                        );

                    }}
                />
            </Container>
        </Box>
    );
};

export default AdminDashboard;
