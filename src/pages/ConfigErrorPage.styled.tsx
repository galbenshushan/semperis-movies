import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const iconPulse = keyframes`
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 32px 16px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

export const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  padding: 48px 40px;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.6s ease-out;
`;

export const IconWrapper = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  animation: ${iconPulse} 2.5s ease-in-out infinite;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0;
  text-align: center;
  letter-spacing: -0.5px;
`;

export const Message = styled.p`
  font-size: 15px;
  color: #b0b0b0;
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.6;
  letter-spacing: 0.3px;
`;

export const HintSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  width: 100%;
`;

export const HintText = styled.span`
  font-size: 13px;
  color: #808080;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
`;

export const HintLink = styled.span`
  font-size: 13px;
  color: #e74c3c;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  letter-spacing: 0.2px;

  &:hover {
    color: #ff6b5b;
  }
`;
