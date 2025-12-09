import styled from 'styled-components';
import { Button } from '@mui/material';

// Main navbar container with Marvel-inspired dark theme
export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: #1b1b1b;
  border-bottom: 3px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
`;

// Inner flex container for layout structure
export const HeaderInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  padding: 0 24px;
  margin: 0 auto;
`;

// Left section for navigation links
export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

// Center section for logo (takes up space to keep logo centered)
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  
  img {
    height: 50px;
    width: auto;
    object-fit: contain;
  }
`;

// Right section for action buttons
export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Styled navigation links
export const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease, text-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: #e62429;
    text-shadow: 0 0 10px rgba(230, 36, 41, 0.3);
  }
`;

// Styled Marvel red button
export const MarvelButton = styled(Button)`
  && {
    background-color: #e62429;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 8px 20px;
    border-radius: 4px;
    border: 2px solid #e62429;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #cc1f24;
      border-color: #cc1f24;
      box-shadow: 0 4px 12px rgba(230, 36, 41, 0.4);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

// Secondary button style (outline)
export const MarvelButtonOutline = styled(Button)`
  && {
    background-color: transparent;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 8px 20px;
    border-radius: 4px;
    border: 2px solid #ffffff;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #ffffff;
      color: #1b1b1b;
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;
