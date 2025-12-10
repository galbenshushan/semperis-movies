import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, Select, IconButton } from '@mui/material';

export const StyledFormControl = styled(FormControl)`
  min-width: 150px;
  flex: 0 1 auto;
`;

export const StyledInputLabel = styled(InputLabel)`
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;

  &.Mui-focused {
    color: #ffffff;
  }
`;

export const StyledSelect = styled(Select)`
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;

  & .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.2);
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

  & .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.6);
  }

  &:hover .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const StyledClearButton = styled(IconButton)`
  margin-right: 4px;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.08);
  }
`;
