import React, { memo, type ReactNode, useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from '@mui/material';
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

/**
 * SelectFilter: Reusable dropdown filter component with clear button.
 * Handles numeric values, custom options, and clear functionality.
 */
export const SelectFilter: React.FC<SelectFilterProps> = memo(
  ({ label, value, onChange, options, placeholder, formatLabel }) => {
    const filterOptions = useMemo(() => {
      return typeof options === 'function' ? options() : options;
    }, [options]);

    const handleClear = () => {
      onChange(null);
    };

    return (
      <FormControl variant="outlined" size="small" sx={{ minWidth: 150, flex: '0 1 auto' }}>
        <InputLabel
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'color 0.2s ease',
            '&.Mui-focused': {
              color: '#ffffff',
            },
          }}
        >
          {label}
        </InputLabel>
        <Select
          value={value ? value.toString() : ''}
          onChange={(e) => onChange(e.target.value ? parseInt(e.target.value, 10) : null)}
          label={label}
          endAdornment={
            value !== null ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  edge="end"
                  sx={{
                    marginRight: '4px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
          sx={{
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'border-color 0.2s ease',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.1)',
            },
            '& .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.6)',
              transition: 'color 0.2s ease',
            },
            '&:hover .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.8)',
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
        </Select>
      </FormControl>
    );
  },
);

SelectFilter.displayName = 'SelectFilter';
