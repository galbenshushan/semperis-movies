import styled from 'styled-components';

export const ContentWrapper = styled.div`
  padding: 32px 0;
`;

export const SearchSection = styled.div`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GridContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
`;
