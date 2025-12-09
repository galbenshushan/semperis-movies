import styled from 'styled-components';

export const ContentWrapper = styled.div`
  padding: 32px 0;
`;

export const SearchSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const GridContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
`;
