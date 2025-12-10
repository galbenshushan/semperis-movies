import React, { memo, type ReactNode, useMemo } from 'react';
import { MenuItem, InputAdornment } from '@mui/material';
import {
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
  StyledClearButton,
} from './SelectFilter.styled';
import CloseIcon from '@mui/icons-material/Close';

interface SelectFilterOption {
  id: string | number;
  label: string;
}

interface SelectFilterProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  options: SelectFilterOption[] | (() => SelectFilterOption[]);
  placeholder?: string;
  formatLabel?: (option: SelectFilterOption) => ReactNode;
}

export const SelectFilter: React.FC<SelectFilterProps> = memo(
  ({ label, value, onChange, options, placeholder, formatLabel }) => {
    const filterOptions = useMemo(
      () => (typeof options === 'function' ? options() : options),
      [options],
    );

    const handleClear = () => {
      onChange(null);
    };

    return (
      <StyledFormControl variant="outlined" size="small">
        <StyledInputLabel>{label}</StyledInputLabel>

        <StyledSelect
          value={value ? value.toString() : ''}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val ? parseInt(val as string, 10) : null);
          }}
          label={label}
          endAdornment={
            value !== null ? (
              <InputAdornment position="end">
                <StyledClearButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  edge="end"
                >
                  <CloseIcon fontSize="small" />
                </StyledClearButton>
              </InputAdornment>
            ) : undefined
          }
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#000000',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                maxHeight: 320,
                '& .MuiMenuItem-root': {
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  transition: 'background-color 0.2s ease',
                },
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
                '& .MuiMenuItem-root.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.12) !important',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2) !important',
                  },
                },
              },
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          <MenuItem value="">
            <em>{placeholder || `All ${label}s`}</em>
          </MenuItem>
          {filterOptions.map((option) => (
            <MenuItem key={option.id} value={option.id.toString()}>
              {formatLabel ? formatLabel(option) : option.label}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    );
  },
);

SelectFilter.displayName = 'SelectFilter';
