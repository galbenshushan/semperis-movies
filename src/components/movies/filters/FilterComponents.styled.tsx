import styled from 'styled-components';
import { TextField, FormControl, Select, IconButton } from '@mui/material';

export const StyledTextField = styled(TextField)`
  flex: 1;

  .MuiOutlinedInput-root {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.2s ease;

    fieldset {
      border-color: rgba(255, 255, 255, 0.2);
      transition: border-color 0.2s ease;
    }

    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.4);
    }

    &.Mui-focused fieldset {
      border-color: #ffffff;
    }

    &.Mui-focused {
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }
  }

  .MuiOutlinedInput-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
    opacity: 1;
  }
`;

export const StyledFormControl = styled(FormControl)`
  min-width: 150px;
  flex: 0 1 auto;

  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.2s ease;

    &.Mui-focused {
      color: #ffffff;
    }
  }

  .MuiOutlinedInput-root {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.2s ease;

    .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.2);
      transition: border-color 0.2s ease;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.4);
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #ffffff;
    }

    &.Mui-focused {
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }

    .MuiSvgIcon-root {
      color: rgba(255, 255, 255, 0.6);
      transition: color 0.2s ease;
    }

    &:hover .MuiSvgIcon-root {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

export const StyledSelect = styled(Select)`
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;

  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.2);
    transition: border-color 0.2s ease;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.4);
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #ffffff;
  }

  &.Mui-focused {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.2s ease;
  }

  &:hover .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const StyledClearButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;
  margin-right: 4px;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.08);
  }
`;
