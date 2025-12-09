import styled from 'styled-components';

export const ErrorContainer = styled.div`
  background-color: #1b1b1b;
  border: 2px solid #e62429;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

export const ErrorIcon = styled.span`
  font-size: 1.5rem;
  color: #e62429;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const ErrorText = styled.p`
  color: #ffffff;
  font-size: 1rem;
  margin: 0 0 12px 0;
  font-weight: 600;
`;
