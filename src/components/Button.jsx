import { Button as MUIButton, CircularProgress } from '@mui/material';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
}) => {
  const variantMap = {
    primary: 'contained',
    secondary: 'outlined',
    danger: 'contained',
    ghost: 'text',
  };

  const sizeMap = {
    sm: 'small',
    md: 'medium',
    lg: 'large',
  };

  const getSxStyles = () => {
    const baseStyles = {
      textTransform: 'none',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    };

    if (variant === 'primary') {
      return {
        ...baseStyles,
        background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
        },
        '&:disabled': {
          background: '#9ca3af',
          color: 'white',
        },
      };
    }

    if (variant === 'danger') {
      return {
        ...baseStyles,
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        },
        '&:disabled': {
          background: '#9ca3af',
          color: 'white',
        },
      };
    }

    if (variant === 'secondary') {
      return {
        ...baseStyles,
        color: '#3b82f6',
        borderColor: '#3b82f6',
        '&:hover': {
          backgroundColor: '#eff6ff',
          borderColor: '#3b82f6',
        },
        '&:disabled': {
          borderColor: '#9ca3af',
          color: '#9ca3af',
        },
      };
    }

    return baseStyles;
  };

  return (
    <MUIButton
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant={variantMap[variant]}
      size={sizeMap[size]}
      fullWidth={fullWidth}
      sx={{
        ...getSxStyles(),
      }}
    >
      {loading && (
        <CircularProgress
          size={20}
          sx={{
            color: 'inherit',
          }}
        />
      )}
      {children}
    </MUIButton>
  );
};

export default Button;

