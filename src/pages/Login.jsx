// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Paper, Box, Typography, Stack, Divider, IconButton, Tooltip } from '@mui/material';
// import { Visibility, VisibilityOff, Lock, Person } from '@mui/icons-material';
// import Input from '../components/Input';
// import Button from '../components/Button';
// import Alert from '../components/Alert';
// import { loginStart, loginSuccess, loginFailure, clearError } from '../store/authSlice';
// import authService from '../services/authService';
// import validation from '../utils/validation';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   // Redirect if already authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: '',
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form
//     const validationErrors = validation.validateLoginForm(formData);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     dispatch(loginStart());

//     try {
//       const response = await authService.login(formData.username, formData.password);
//       dispatch(
//         loginSuccess({
//           token: response.access_token,
//           user: response.user,
//         })
//       );
//       navigate('/dashboard');
//     } catch (err) {
//       const errorMessage = err.message || 'Login failed. Please try again.';
//       dispatch(loginFailure(errorMessage));
//       setErrors({ submit: errorMessage });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         overflow: 'hidden',
//         background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 50%, #fef3c7 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: '-10%',
//           right: '-5%',
//           width: '400px',
//           height: '400px',
//           background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
//           borderRadius: '50%',
//           pointerEvents: 'none',
//         },
//         '&::after': {
//           content: '""',
//           position: 'absolute',
//           bottom: '-10%',
//           left: '-5%',
//           width: '400px',
//           height: '400px',
//           background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
//           borderRadius: '50%',
//           pointerEvents: 'none',
//         },
//       }}
//     >
//       <Container maxWidth="sm">
//         <Box sx={{ position: 'relative', zIndex: 10 }}>
//           {/* Card */}
//           <Paper
//             elevation={12}
//             sx={{
//               padding: 3,
//               borderRadius: 3,
//               backdropFilter: 'blur(20px)',
//               backgroundColor: 'rgba(255, 255, 255, 0.95)',
//               maxHeight: '90vh',
//               overflowY: 'auto',
//             }}
//           >
//             {/* Header */}
//             <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
//               <Box
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   width: 56,
//                   height: 56,
//                   background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
//                   borderRadius: '50%',
//                   marginBottom: 1.5,
//                   boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
//                 }}
//               >
//                 <Lock sx={{ color: 'white', fontSize: 28 }} />
//               </Box>
//               <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 1, color: '#1f2937' }}>
//                 Welcome Back
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#6b7280' }}>
//                 Sign in to your account to continue
//               </Typography>
//             </Box>

//             {/* Alerts */}
//             {error && (
//               <Box sx={{ marginBottom: 2 }}>
//                 <Alert
//                   type="error"
//                   message={error}
//                   onClose={() => dispatch(clearError())}
//                   autoClose={true}
//                   duration={5000}
//                 />
//               </Box>
//             )}

//             {/* Form */}
//             <Box component="form" onSubmit={handleSubmit}>
//               <Stack spacing={2}>
//                 <Input
//                   label="Username"
//                   type="text"
//                   name="username"
//                   placeholder="Enter your username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   error={errors.username}
//                   icon={Person}
//                   required
//                 />

//                 <Box>
//                   <Input
//                     label="Password"
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     error={errors.password}
//                     icon={Lock}
//                     required
//                   />
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
//                     <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                         sx={{
//                           padding: 0,
//                           color: '#3b82f6',
//                           '&:hover': {
//                             backgroundColor: 'rgba(59, 130, 246, 0.1)',
//                           },
//                         }}
//                         size="small"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </Box>

//                 <Button
//                   type="submit"
//                   variant="primary"
//                   size="lg"
//                   fullWidth
//                   loading={loading}
//                   disabled={loading}
//                 >
//                   Sign In
//                 </Button>
//               </Stack>
//             </Box>

//             {/* Divider */}
//             <Divider sx={{ my: 2 }} />

//             {/* Footer */}
//             <Typography variant="body2" sx={{ textAlign: 'center', color: '#6b7280' }}>
//               Don't have an account?{' '}
//               <Link
//                 to="/signup"
//                 style={{
//                   color: '#3b82f6',
//                   textDecoration: 'none',
//                   fontWeight: 600,
//                   transition: 'color 0.3s',
//                 }}
//                 onMouseEnter={(e) => (e.target.style.color = '#1d4ed8')}
//                 onMouseLeave={(e) => (e.target.style.color = '#3b82f6')}
//               >
//                 Sign up
//               </Link>
//             </Typography>
//           </Paper>

//           {/* Additional info */}
//           <Typography
//             variant="caption"
//             sx={{
//               display: 'block',
//               textAlign: 'center',
//               color: '#9ca3af',
//               marginTop: 1.5,
//             }}
//           >
//             By signing in, you agree to our Terms of Service and Privacy Policy
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Login;

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
      console.log("response",response);

      dispatch(
        loginSuccess({
          token: response.access_token,
          user: response.user,
        })
      );

      // Role-based redirection
      const userRole = response.role;
      console.log("userRole",userRole);
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
