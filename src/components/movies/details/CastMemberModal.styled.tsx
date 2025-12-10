import styled from 'styled-components';
import { Modal as MuiModal } from '@mui/material';

// Modal wrapper with custom styling (using MUI Modal's backdrop styling)
export const StyledModal = styled(MuiModal)`
  .MuiBackdrop__root {
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(4px);
  }
`;

// Modal content container - positioned absolutely within Modal's Box
export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  border: 2px solid rgba(230, 36, 41, 0.5);
  border-radius: 16px;
  max-width: 1200px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.9),
    0 0 80px rgba(230, 36, 41, 0.3);
  outline: none;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(230, 36, 41, 0.6) transparent;

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

  @media (max-width: 768px) {
    width: 98%;
    max-height: 95vh;
  }
`;

// Close button
export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  color: #ffffff;
  background: rgba(230, 36, 41, 0.2);
  border: 1px solid rgba(230, 36, 41, 0.5);
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(230, 36, 41, 0.4);
    border-color: #e62429;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

// Main grid layout
export const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  padding: 40px;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    gap: 20px;
  }
`;

// Profile image card
export const ProfileImageCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 2/3;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 60px rgba(230, 36, 41, 0.3);
  border: 2px solid rgba(230, 36, 41, 0.5);
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 25px 70px rgba(0, 0, 0, 0.9),
      0 0 70px rgba(230, 36, 41, 0.4);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    max-width: 250px;
    margin: 0 auto;
  }
`;

// Profile image
export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// Profile placeholder
export const ProfilePlaceholder = styled.div`
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

// Info section
export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Name
export const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

// Info row (age, birthplace)
export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Label
export const Label = styled.span`
  font-size: 0.85rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
`;

// Value
export const Value = styled.span`
  font-size: 1rem;
  color: #ffffff;
  font-weight: 500;
`;

// Biography section
export const BiographySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid rgba(230, 36, 41, 0.3);
`;

// Biography title
export const BiographyTitle = styled.h2`
  font-size: 1.1rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 0;
`;

// Biography text
export const BiographyText = styled.p`
  font-size: 0.95rem;
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
`;

// Empty state
export const EmptyBiography = styled.p`
  font-size: 0.95rem;
  color: #666666;
  font-style: italic;
  margin: 0;
`;
