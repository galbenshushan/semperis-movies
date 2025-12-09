import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  background: transparent;
  border-radius: 0;
  border: none;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

    & > * {
      width: 100%;
    }
  }
`;
