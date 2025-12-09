import styled from 'styled-components';

export const CastContainer = styled.div`
  margin-top: 24px;
`;

export const CastTitle = styled.h3`
  font-size: 0.95rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 0 0 12px 0;
`;

export const CastList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
`;

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

export const CastName = styled.p`
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

export const CastCharacter = styled.div`
  font-size: 0.85rem;
  color: #999999;
`;
