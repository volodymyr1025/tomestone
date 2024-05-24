import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingComponent: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress size={80} thickness={4.5} />
    </Box>
  );
}

export default LoadingComponent;
