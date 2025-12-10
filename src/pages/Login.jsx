
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Box,
  Typography,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, VpnKey } from '@mui/icons-material';

import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from '../store/authSlice';
import authService from '../services/authService';
import validation from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    pin: '',
  });
  const [errors, setErrors] = useState({});
  const [showPin, setShowPin] = useState(false);

  // Redirect if already logged in
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (isAuthenticated && user) {
      const userRole = user.role;
      if (userRole === 'admin') {
        navigate('/voiceAgent');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict PIN to 4 digits only
    if (name === 'pin') {
      if (value === '' || (/^\d+$/.test(value) && value.length <= 4)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use updated validation (we'll update validateLoginForm below)
    const validationErrors = validation.validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(loginStart());

    try {
      // Now sending email + pin
      const response = await authService.login(formData.email, formData.pin);
      console.log("response", response);

      localStorage.setItem("loginTime", new Date().toISOString());
      localStorage.setItem("role", response.role);


      dispatch(
        loginSuccess({
          token: response.access_token,
          user: response.user,
        })
      );

      // Role-based redirection
      const userRole = response.role;
      console.log("userRole", userRole);
      if (userRole === 'admin') {
        navigate('/voiceagent');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.message || 'Invalid email or PIN';
      dispatch(loginFailure(errorMessage));
      setErrors({ submit: errorMessage });
    }

    //     try {
    //   const response = await authService.login(formData.email, formData.pin);

    //   localStorage.setItem("loginTime", new Date().toISOString());

    //   dispatch(
    //     loginSuccess({
    //       token: response.access_token,
    //       user: response.user,
    //     })
    //   );

    //   // FIXED
    //   const userRole = response.user?.role;

    //   if (userRole === 'admin') {
    //     navigate('/voiceagent');
    //   } else {
    //     navigate('/dashboard');
    //   }

    // } catch (err) {
    //   const errorMessage = err.message || 'Invalid email or PIN';
    //   dispatch(loginFailure(errorMessage));
    //   setErrors({ submit: errorMessage }); // optional (for inline form errors)
    // }

  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 50%, #fef3c7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 70,
                height: 70,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(135deg, #22c55e, #0ea5e9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(34,197,94,0.4)',
              }}
            >
              <VpnKey sx={{ fontSize: 38, color: 'white' }} />
            </Box>
            <Typography variant="h4" fontWeight={700} color="#1f2937">
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Sign in with your email and 4-digit PIN
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => dispatch(clearError())}
              autoClose
              duration={6000}
            />
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} mt={2}>
            <Stack spacing={3}>
              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={Email}
                required
              />

              {/* PIN */}
              <Box>
                <Input
                  label="4-Digit PIN"
                  type={showPin ? 'text' : 'password'}
                  name="pin"
                  placeholder="••••"
                  value={formData.pin}
                  onChange={handleChange}
                  error={errors.pin}
                  icon={VpnKey}
                  required
                  inputProps={{ maxLength: 4, inputMode: 'numeric' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                  <Tooltip title={showPin ? 'Hide PIN' : 'Show PIN'}>
                    <IconButton
                      onClick={() => setShowPin(!showPin)}
                      size="small"
                      sx={{ color: '#22c55e' }}
                    >
                      {showPin ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography textAlign="center" color="text.secondary">
            New here?{' '}
            <Link
              to="/signup"
              style={{
                color: '#22c55e',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Create an account
            </Link>
          </Typography>

          <Typography variant="caption" display="block" textAlign="center" color="#9ca3af" mt={2}>
            Secured with encrypted PIN authentication
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
