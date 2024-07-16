import styled from 'styled-components';

export const List = styled.ul`
  @media (min-width: 426px) and (max-width: 1023px) {
    overflow-y: scroll;
    height: 244px;
    max-width: 610px;
  }
  @media (min-width: 1024px) {
    width: 610px;
    overflow-y: scroll;
    height: 244px;
  }
  &.hidden {
    overflow: hidden;
  }
`;

export const NoProductsContainer = styled.div`
  text-align: left;
  margin-top: 25px;
  padding-left: 60px;
`;
