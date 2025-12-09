import React, { useRef } from 'react';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { StyledTextField, StyledClearButton } from './FilterComponents.styled';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

/**
 * SearchInput: Presentational search component with debounced onChange and clear button.
 * Uses useSearchQuery hook for all search logic.
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search movies...',
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { localValue, handleChange, handleClear } = useSearchQuery(value, onChange, onClear);

  return (
    <StyledTextField
      inputRef={inputRef}
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      variant="outlined"
      size="small"
      fullWidth
      slotProps={{
        input: {
          endAdornment: localValue && (
            <InputAdornment position="end">
              <StyledClearButton size="small" onClick={() => handleClear(inputRef)} edge="end">
                <CloseIcon fontSize="small" />
              </StyledClearButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
