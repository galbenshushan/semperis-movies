import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderInner,
  LogoWrapper,
  LogoLink,
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
        <NavLeft>
          <NavLink disabled={true}>Characters</NavLink>
          <NavLink as={Link} to="/">
            Movies
          </NavLink>
        </NavLeft>

        <LogoWrapper>
          <LogoLink to="/">
            <img src={MarvelLogo} alt="Marvel Logo" />
          </LogoLink>
        </LogoWrapper>

        <NavActions>
          <MarvelButtonOutline variant="outlined">Log In</MarvelButtonOutline>
          <MarvelButton variant="contained">Sign Up</MarvelButton>
        </NavActions>
      </HeaderInner>
    </HeaderContainer>
  );
};
