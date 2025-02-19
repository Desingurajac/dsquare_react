import { Snackbar, SnackbarContent } from '@mui/material';
import React from 'react';
import './DSSnackbar.css';


const DSSnackbar = ({ message, variant, open, onClose, action }) => {
  const styles = {
    success: { backgroundColor: '#4caf50' },
    error: { backgroundColor: '#f44336' },
    warning: { backgroundColor: '#ff9800' },
    info: { backgroundColor: '#2196f3' },
  };
  const Message = message + '!';
  return (
    <Snackbar
      className='dsmargin'
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} // ✅ Set position to top-right
      autoHideDuration={4000} // Auto-close after 4 seconds
    >
      <SnackbarContent
        style={styles[variant] || {}}
        message={Message}
        action={action}
      />
    </Snackbar>
  )
}

export default DSSnackbar
