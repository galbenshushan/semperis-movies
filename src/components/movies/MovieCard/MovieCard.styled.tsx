import styled from 'styled-components';
import { Card } from '@mui/material';

// Main card container with Marvel dark theme styling
export const CardContainer = styled(Card)`
  && {
    background-color: #1b1b1b;
    border: 2px solid #ffffff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: #e62429;
      box-shadow: 0 8px 24px rgba(230, 36, 41, 0.3);
    }
  }
`;

// Poster image wrapper with fixed aspect ratio
export const PosterWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: #101010;
  border-bottom: 1px solid #ffffff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

// Fallback placeholder for missing posters
export const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1b1b1b 0%, #0a0a0a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.875rem;
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid #ffffff;
`;

// Content wrapper with padding
export const CardContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

// Movie title styling
export const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Release year text
export const Year = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #cccccc;
  font-weight: 500;
`;

// Rating badge container
export const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e62429;
  color: #ffffff;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
  margin-top: 4px;
`;
