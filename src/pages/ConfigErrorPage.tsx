import React from 'react';
import {
  ErrorContainer,
  ErrorCard,
  IconWrapper,
  Title,
  Message,
  HintSection,
  HintText,
  HintLink,
} from './ConfigErrorPage.styled';

interface ConfigErrorPageProps {
  message: string;
}

export const ConfigErrorPage: React.FC<ConfigErrorPageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorCard>
        <IconWrapper>⚠️</IconWrapper>
        <Title>Configuration Error</Title>
        <Message>{message}</Message>
        <HintSection>
          <HintText>Need help?</HintText>
          <HintLink onClick={() => window.open('README.md', '_blank')}>
            Check README for setup instructions
          </HintLink>
        </HintSection>
      </ErrorCard>
    </ErrorContainer>
  );
};

