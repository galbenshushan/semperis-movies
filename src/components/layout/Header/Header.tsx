import React from 'react';
import {
  HeaderContainer,
  HeaderInner,
  LogoWrapper,
  NavActions,
  MarvelButton,
  MarvelButtonOutline,
} from './Header.styled';
import MarvelLogo from '../../../assets/Marvel_Logo.svg';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <LogoWrapper>
          <img src={MarvelLogo} alt="Marvel Logo" />
        </LogoWrapper>

        <NavActions>
          <MarvelButtonOutline variant="outlined">Log In</MarvelButtonOutline>
          <MarvelButton variant="contained">Sign Up</MarvelButton>
        </NavActions>
      </HeaderInner>
    </HeaderContainer>
  );
};
