import { Card } from '@mui/material';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NoImagePlaceholder = styled.div`
  text-align: center;
  color: #999;
`;

export const ContentContainer = styled.div`
  padding: 16px;
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1rem;
`;

export const RatingText = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;
