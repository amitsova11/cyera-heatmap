import { Button } from '@mui/material';
import React from 'react';

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Error</h2>
      <p>{message}</p>
      <p>We couldn't load the data. Please try again later.</p>
      <Button variant="contained" color="primary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
};