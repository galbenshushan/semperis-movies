import styled from 'styled-components';
import { Button, Chip } from '@mui/material';

// Full-page wrapper with dark background
export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  /* Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(230, 36, 41, 0.6);
    border-radius: 4px;

    &:hover {
      background: rgba(230, 36, 41, 0.8);
    }
  }
`;

// Cinematic hero section with backdrop - contains ALL content
export const HeroSection = styled.div<{ $backdropUrl?: string }>`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: ${(props) =>
    props.$backdropUrl
      ? `url(${props.$backdropUrl}) center / cover no-repeat fixed`
      : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Dark gradient overlays for readability */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.6) 40%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 40px 0;
  }

  @media (max-width: 480px) {
    padding: 30px 0;
  }
`;

// Content container inside hero - wraps all content
export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  padding: 60px 40px;
  margin: 0 auto;
`;

// Main grid layout: poster left, info right
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 60px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    grid-template-columns: 280px 1fr;
    gap: 50px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

// Floating poster card
export const PosterCard = styled.div`
  position: relative;
  z-index: 5;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 2/3;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 60px rgba(230, 36, 41, 0.3);
  border: 2px solid rgba(230, 36, 41, 0.5);
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.9),
      0 0 80px rgba(230, 36, 41, 0.5);
    transform: translateY(-8px);
  }

  @media (max-width: 768px) {
    max-width: 260px;
    margin: 0 auto;
  }
`;

// Poster image
export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// Poster placeholder
export const PosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
  padding: 20px;
`;

// Hero info section (inside hero)
export const HeroInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

// Hero title
export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  letter-spacing: -1px;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

// Meta information row in hero
export const HeroMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  margin-top: 8px;
`;

// Rating badge (in hero)
export const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #e62429;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(230, 36, 41, 0.4);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
`;

// Meta information text
export const MetaInfo = styled.span`
  font-size: 0.95rem;
  color: #d0d0d0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

// Info section on the right
export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 28px;
  }
`;

// Year text
export const Year = styled.span`
  font-size: 1.1rem;
  color: #b0b0b0;
  font-weight: 500;
`;

// Genres container
export const GenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

// Premium genre chip
export const GenreChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, rgba(230, 36, 41, 0.15) 0%, rgba(230, 36, 41, 0.05) 100%);
    color: #e62429;
    border: 1.5px solid #e62429;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.3px;
    padding: 4px 2px;
    height: auto;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, rgba(230, 36, 41, 0.25) 0%, rgba(230, 36, 41, 0.1) 100%);
      border-color: #ff5a62;
      box-shadow: 0 0 20px rgba(230, 36, 41, 0.3);
    }
  }
`;

// Overview section
export const OverviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Overview label
export const SectionLabel = styled.h3`
  font-size: 0.95rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 4px;
`;

// Overview text
export const Overview = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #d0d0d0;
  margin: 0;
  max-width: 700px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

// Overview text (alternative naming for compatibility)
export const OverviewText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #d0d0d0;
  margin: 0;
  max-width: 700px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

// Runtime text
export const RuntimeText = styled.span`
  font-size: 0.95rem;
  color: #d0d0d0;
  font-weight: 500;
`;

// Director section
export const DirectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  padding: 12px;
  background: rgba(230, 36, 41, 0.08);
  border-left: 3px solid #e62429;
  border-radius: 4px;
`;

// Director label
export const DirectorLabel = styled.span`
  font-size: 0.9rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
`;

// Director name
export const DirectorName = styled.p`
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 600;
  margin: 0;
`;

// Cast section
export const CastContainer = styled.div`
  margin-top: 24px;
`;

// Cast title
export const CastTitle = styled.h3`
  font-size: 0.95rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 0 0 12px 0;
`;

// Cast list
export const CastList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Cast item
export const CastItem = styled.div`
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(230, 36, 41, 0.3);
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(230, 36, 41, 0.1);
    border-color: #e62429;
  }
`;

// Cast name
export const CastName = styled.p`
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

// Button container
export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

// Back button
export const BackButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #e62429 0%, #cc1f23 100%);
    color: #ffffff;
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 12px 32px;
    border-radius: 6px;
    border: none;
    box-shadow: 0 6px 20px rgba(230, 36, 41, 0.4);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      background: linear-gradient(135deg, #ff4d52 0%, #e62429 100%);
      box-shadow:
        0 8px 30px rgba(230, 36, 41, 0.6),
        0 0 40px rgba(230, 36, 41, 0.3);
      transform: translateY(-2px);

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(0);
    }

    @media (max-width: 480px) {
      padding: 10px 24px;
      font-size: 0.85rem;
    }
  }
`;

// TMDB button
export const TMDBButton = styled(Button)`
  && {
    border: 2px solid #e62429;
    color: #e62429;
    background: transparent;
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 30px;
    border-radius: 6px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #e62429 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }

    &:hover {
      color: #ffffff;
      border-color: #ff4d52;
      box-shadow: 0 0 30px rgba(230, 36, 41, 0.4);
      background: rgba(230, 36, 41, 0.1);
    }

    @media (max-width: 480px) {
      padding: 8px 22px;
      font-size: 0.85rem;
    }
  }
`;

// Error state container
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 40px;
  padding: 40px 20px;
`;

// Not found title
export const NotFoundTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
