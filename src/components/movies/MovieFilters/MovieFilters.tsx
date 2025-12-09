import React from 'react';
import { Button } from '@mui/material';
import { FilterContainer, StyledTextField } from './MovieFilters.styled';

interface MovieFiltersProps {
  onFilterChange?: (filters: Record<string, unknown>) => void;
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({ onFilterChange }) => {
  const handleFilterChange = () => {
    // TODO: Implement filter logic
    onFilterChange?.({});
  };

  return (
    <FilterContainer>
      <StyledTextField
        label="Filter by genre"
        variant="outlined"
        size="small"
      />
      <StyledTextField
        label="Release year"
        variant="outlined"
        size="small"
      />
      <Button variant="contained" onClick={handleFilterChange}>
        Filter
      </Button>
    </FilterContainer>
  );
};
