import { Button } from '@mui/material';
import React from 'react';

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div className="error-screen">
      <h2>Error</h2>
      <p>{message}</p>
      <p>We couldn't load the data. Please try again later.</p>
      <Button variant="contained" color="primary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
};