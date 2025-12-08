import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button as MUIButton,
  Paper,
  Stack,
} from '@mui/material';
import { Logout, Person, Email, DateRange, Security, VolumeUp, BarChart, Settings, Help, Description, ApiSharp } from '@mui/icons-material';
import Button from '../components/Button';
import { logout } from '../store/authSlice';
import authService from '../services/authService';
import { setUser } from '../store/authSlice';

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      dispatch(logout());
      navigate('/login');
    }, 500);
  };


  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      // dispatch(setUser(response.user)); 
      dispatch(setUser(response));
    } catch (error) {
      console.log('Failed to fetch user:', error);
    }
  };

  if (!user) {
    fetchUser();
  }
}, [dispatch, user]);

  // Get user data from localStorage if not in Redux
  // const userData = user || (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
// const userData = user || localStorage.getItem("user");
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 50%, #fef3c7 100%)',
        paddingBottom: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'fixed',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Navigation Header */}
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
            onClick={handleLogout}
            loading={isLoggingOut}
            disabled={isLoggingOut}
          >
            <Logout sx={{ fontSize: 18 }} />
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, paddingTop: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ marginBottom: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              marginBottom: 1,
              color: '#1f2937',
            }}
          >
            Welcome back,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {/* {userData?.username || 'User'} */}
              {user?.username}
            </span>
            !
          </Typography>
          <Typography variant="body1" sx={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Here's what's happening with your account today
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ marginBottom: 6 }}>
          {/* Stat Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Typography sx={{ color: '#6b7280', fontWeight: 600 }} variant="body2">
                    Account Status
                  </Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #dcfce7 0%, #ccfbf1 100%)',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Security sx={{ color: '#16a34a', fontSize: 24 }} />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1, color: '#1f2937' }}>
                  Active
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                  Your account is secure and active
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Stat Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Typography sx={{ color: '#6b7280', fontWeight: 600 }} variant="body2">
                    Member Since
                  </Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #dbeafe 0%, #cffafe 100%)',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <DateRange sx={{ color: '#0284c7', fontSize: 24 }} />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1, color: '#1f2937' }}>
                  Today
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                  Welcome to our platform
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Stat Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Typography sx={{ color: '#6b7280', fontWeight: 600 }} variant="body2">
                    Security
                  </Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Security sx={{ color: '#a855f7', fontSize: 24 }} />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1, color: '#1f2937' }}>
                  Verified
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                  Your email is verified
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* User Profile Card */}
        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.08)',
            marginBottom: 6,
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 4, color: '#1f2937' }}>
              Account Information
            </Typography>

            <Grid container spacing={4}>
              {/* Profile Info */}
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  {/* Username */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <Person sx={{ color: 'white', fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Username
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                        {/* {userData?.username || 'N/A'} */}
                        {user?.username}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      <Email sx={{ color: 'white', fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Email Address
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                        {/* {userData?.email || 'N/A'} */}
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Grid>

              {/* Quick Actions */}
              {/* <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
                    padding: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(59, 130, 246, 0.1)',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: 2, color: '#1f2937' }}>
                    Quick Actions
                  </Typography>
                  <Stack spacing={1}>
                    <MUIButton
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: '#3b82f6',
                        borderColor: '#3b82f6',
                        '&:hover': {
                          backgroundColor: '#eff6ff',
                          borderColor: '#3b82f6',
                        },
                      }}
                    >
                      Edit Profile
                    </MUIButton>
                    <MUIButton
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: '#3b82f6',
                        borderColor: '#3b82f6',
                        '&:hover': {
                          backgroundColor: '#eff6ff',
                          borderColor: '#3b82f6',
                        },
                      }}
                    >
                      Change Password
                    </MUIButton>
                    <MUIButton
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: '#3b82f6',
                        borderColor: '#3b82f6',
                        '&:hover': {
                          backgroundColor: '#eff6ff',
                          borderColor: '#3b82f6',
                        },
                      }}
                    >
                      Security Settings
                    </MUIButton>
                  </Stack>
                </Paper>
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>

        {/* Features Section */}
        {/* <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 3, color: '#1f2937' }}>
            Available Features
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Voice Integration', description: 'Connect and manage voice agents', icon: VolumeUp },
              { title: 'Analytics', description: 'Track performance and metrics', icon: BarChart },
              { title: 'Settings', description: 'Customize your preferences', icon: Settings },
              { title: 'Support', description: 'Get help when you need it', icon: Help },
              { title: 'Documentation', description: 'Learn how to use the platform', icon: Description },
              { title: 'API Access', description: 'Integrate with your systems', icon: ApiSharp },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      borderColor: '#3b82f6',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        background: 'linear-gradient(135deg, #dbeafe 0%, #cffafe 100%)',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <feature.icon sx={{ color: '#3b82f6', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1, color: '#1f2937' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Dashboard;
