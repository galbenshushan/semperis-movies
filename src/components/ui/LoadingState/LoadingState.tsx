import React from 'react';
import { CircularProgress } from '@mui/material';
import { LoadingContainer } from './LoadingState.styled';

export const LoadingState: React.FC = () => {
  return (
    <LoadingContainer>
      <CircularProgress sx={{ color: '#e62429' }} />
    </LoadingContainer>
  );
};
