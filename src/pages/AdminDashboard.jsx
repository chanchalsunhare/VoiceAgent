import { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button as MUIButton,
    Card,
    CardContent,
    Grid,
    TextField,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { Logout, Security } from '@mui/icons-material';


const AdminDashboard = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [formData, setFormData] = useState({ email: '', username: '', pin: '', phone: '' });


    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) setUsers(JSON.parse(storedUsers));
    }, []);

    const handleAddClick = () => setIsAdding(true);
    const handleCloseForm = () => setIsAdding(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSave = () => {
        const updatedUsers = [...users, formData];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setFormData({ email: '', username: '', pin: '', phone: '' });
        setIsAdding(false);
    };

    const handleEdit = (index) => {
        const user = users[index];
        setFormData(user);
        setIsAdding(true);
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    };
    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            dispatch(logout());
            navigate('/login');
        }, 500);
    };

    const handleView = (user) => {
        alert(`User Details:\nEmail: ${user.email}\nUsername: ${user.username}\nPIN: ${user.pin}\nPhone: ${user.phone}`);
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#f3f4f6', paddingBottom: 4 }}>



            <AppBar
                position="sticky"
                sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    color: '#1f2937',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                            }}
                        >
                            <Security sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            VoiceAgent
                        </Typography>
                    </Box>
                    <Button
                        variant="danger"
                        size="md"
                        // onClick={handleLogout}
                        // loading={isLoggingOut}
                        // disabled={isLoggingOut}
                    >
                        <Logout sx={{ fontSize: 18 }} />
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>


            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.7rem",
                            letterSpacing: "0.5px",
                            background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0px 1px 1px rgba(0,0,0,0.05)",
                            paddingLeft: 1,
                        }}
                    >
                        Admin Console
                    </Typography>

                    <MUIButton
                        variant="contained"
                        onClick={handleAddClick}
                        sx={{
                            background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 3,
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                            textTransform: "none",
                            "&:hover": {
                                background: "linear-gradient(135deg, #1e40af 0%, #0891b2 100%)",
                            },
                        }}
                    >
                        Add User
                    </MUIButton>
                </Box>




                <Grid container spacing={2}>
                    {users.length === 0 && <Typography>No users added yet.</Typography>}
                    {users.map((user, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {user.username}
                                    </Typography>
                                    <Typography variant="body2">Email: {user.email}</Typography>
                                    <Typography variant="body2">Phone: {user.phone}</Typography>
                                    <Typography variant="body2">PIN: {user.pin}</Typography>
                                    <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                                        <MUIButton variant="outlined" onClick={() => handleEdit(index)}>
                                            Edit
                                        </MUIButton>
                                        <MUIButton variant="outlined" onClick={() => handleView(user)}>
                                            Delete
                                        </MUIButton>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>


                <Dialog
                    open={isAdding}
                    onClose={handleCloseForm}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            paddingY: 1,
                            boxShadow: '0px 8px 30px rgba(0,0,0,0.15)',
                            animation: 'fadeIn 0.3s ease',
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.4rem',
                            background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center',
                            paddingBottom: 0,
                        }}
                    >
                        {formData.username ? 'Edit User' : 'Add New User'}
                    </DialogTitle>

                    <DialogContent sx={{ mt: 2, pb: 1 }}>
                        <Stack spacing={2}>
                            <TextField
                                label="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="4-Digit PIN"
                                name="pin"
                                type="number"
                                value={formData.pin}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ padding: 2, justifyContent: 'space-between' }}>
                        <MUIButton
                            onClick={handleCloseForm}
                            sx={{
                                paddingX: 3,
                                borderRadius: 2,
                                fontWeight: 600,
                                textTransform: 'none',
                            }}
                        >
                            Cancel
                        </MUIButton>

                        <MUIButton
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                paddingX: 4,
                                borderRadius: 2,
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                                textTransform: 'none',
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                            }}
                        >
                            Save User
                        </MUIButton>
                    </DialogActions>


                    <style>
                        {`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `}
                    </style>
                </Dialog>

            </Container>
        </Box>
    );
};

export default AdminDashboard;
