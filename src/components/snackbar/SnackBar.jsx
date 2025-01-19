import React from 'react'
import SnackbarContent from '@mui/material/SnackbarContent';

const SnackBar = ({ message, variant, action }) => {
    const styles = {
        success: { backgroundColor: '#4caf50' },
        error: { backgroundColor: '#f44336' },
        warning: { backgroundColor: '#ff9800' },
        info: { backgroundColor: '#2196f3' },
      };

  return (
    <SnackbarContent
      style={styles[variant] || {}}
      message={message}
      action={action}
    />
  )
}

export default SnackBar
