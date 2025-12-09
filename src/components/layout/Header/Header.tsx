import React from 'react';
import {
  HeaderContainer,
  HeaderInner,
  LogoWrapper,
  NavLeft,
  NavActions,
  NavLink,
  MarvelButton,
  MarvelButtonOutline,
} from './Header.styled';
import MarvelLogo from '../../../assets/Marvel_Logo.svg';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        {/* Left Navigation */}
        <NavLeft>
          <NavLink href="#characters">Characters</NavLink>
          <NavLink href="#movies">Movies</NavLink>
          <NavLink href="#shows">Shows</NavLink>
        </NavLeft>

        {/* Centered Logo */}
        <LogoWrapper>
          <img src={MarvelLogo} alt="Marvel Logo" />
        </LogoWrapper>

        {/* Right Actions */}
        <NavActions>
          <MarvelButtonOutline variant="outlined">
            Log In
          </MarvelButtonOutline>
          <MarvelButton variant="contained">
            Sign Up
          </MarvelButton>
        </NavActions>
      </HeaderInner>
    </HeaderContainer>
  );
};
