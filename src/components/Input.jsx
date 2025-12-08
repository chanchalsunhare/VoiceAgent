import { TextField, InputAdornment } from '@mui/material';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  icon: Icon,
  required = false,
  name = '',
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
      error={!!error}
      helperText={error}
      required={required}
      variant="outlined"
      InputProps={{
        startAdornment: Icon ? (
          <InputAdornment position="start">
            <Icon sx={{ fontSize: 20, color: '#9ca3af' }} />
          </InputAdornment>
        ) : null,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(249, 250, 251, 1)',
          transition: 'all 0.3s ease',
          '& fieldset': {
            borderColor: error ? '#ef4444' : '#e5e7eb',
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: error ? '#ef4444' : '#d1d5db',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            '& fieldset': {
              borderColor: error ? '#ef4444' : '#3b82f6',
              borderWidth: '2px',
            },
          },
        },
        '& .MuiOutlinedInput-input': {
          color: '#1f2937 !important',
          fontSize: '1rem',
          fontWeight: 500,
          '&::placeholder': {
            color: '#d1d5db !important',
            opacity: '1 !important',
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px rgba(249, 250, 251, 1) inset !important',
            WebkitTextFillColor: '#1f2937 !important',
          },
        },
        '& .MuiFormHelperText-root': {
          color: '#ef4444',
          marginTop: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      }}
    />
  );
};

export default Input;

