
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
import { Visibility, VisibilityOff, Email, Person, Phone, VpnKey } from '@mui/icons-material';

import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import {
  signupStart,
  signupSuccess,
  signupFailure,
  clearError,
  clearSuccessMessage,
} from '../store/authSlice';
import authService from '../services/authService';
import validation from '../utils/validation';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successMessage, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    pin: '',
    confirmPin: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Auto redirect to login after successful signup
  useEffect(() => {
    if (successMessage && successMessage.toLowerCase().includes('successful')) {
      const timer = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers and max 4 digits for PIN fields
    if (name === 'pin' || name === 'confirmPin') {
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

    // Client-side validation
    const validationErrors = validation.validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(signupStart());

    try {
      // Update your authService.signup to accept (username, email, pin, phone)
      const response = await authService.signup(
        formData.username,
        formData.email,
        formData.pin,      // PIN instead of password
        formData.phone
      );

      dispatch(signupSuccess(response));
    } catch (err) {
      const errorMessage = err.message || 'Signup failed. Please try again.';
      dispatch(signupFailure(errorMessage));
      setErrors({ submit: errorMessage });
    }
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
              <Person sx={{ fontSize: 38, color: 'white' }} />
            </Box>
            <Typography variant="h4" fontWeight={700} color="#1f2937">
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Join us with a secure 4-digit PIN
            </Typography>
          </Box>

          {/* Alerts */}
          {error && (
            <Alert type="error" message={error} onClose={() => dispatch(clearError())} autoClose duration={6000} />
          )}
          {successMessage && (
            <Alert type="success" message={successMessage} onClose={() => dispatch(clearSuccessMessage())} autoClose duration={4000} />
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3} mt={2}>

              {/* Username */}
              <Input
                label="Username"
                name="username"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                icon={Person}
                required
              />

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
                    <IconButton onClick={() => setShowPin(!showPin)} size="small" sx={{ color: '#22c55e' }}>
                      {showPin ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Confirm PIN */}
              <Box>
                <Input
                  label="Confirm PIN"
                  type={showConfirmPin ? 'text' : 'password'}
                  name="confirmPin"
                  placeholder="••••"
                  value={formData.confirmPin}
                  onChange={handleChange}
                  error={errors.confirmPin}
                  icon={VpnKey}
                  required
                  inputProps={{ maxLength: 4, inputMode: 'numeric' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                  <Tooltip title={showConfirmPin ? 'Hide PIN' : 'Show PIN'}>
                    <IconButton onClick={() => setShowConfirmPin(!showConfirmPin)} size="small" sx={{ color: '#22c55e' }}>
                      {showConfirmPin ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Phone */}
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="+919876543210"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                icon={Phone}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
                sx={{ mt: 2, py: 1.5 }}
              >
                Create Account
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography textAlign="center" color="text.secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#22c55e',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Sign in here
            </Link>
          </Typography>

          <Typography variant="caption" display="block" textAlign="center" color="#9ca3af" mt={2}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
