import { useState, useEffect } from 'react';
import { Alert as MUIAlert } from '@mui/material';

const Alert = ({ type = 'info', message, onClose, autoClose = true, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  const severityMap = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
  };

  return (
    <MUIAlert
      severity={severityMap[type]}
      onClose={() => {
        setIsVisible(false);
        onClose?.();
      }}
      sx={{
        animation: 'slideIn 0.3s ease-out',
        '@keyframes slideIn': {
          from: {
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {message}
    </MUIAlert>
  );
};

export default Alert;

