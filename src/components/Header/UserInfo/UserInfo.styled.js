import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  padding: 15px 20px 8px;
  width: 100%;
  background-color: ${p => p.theme.colors.backgroundGray};
  @media (max-width: 425px) {
    position: relative;
    z-index: 21;
  }
  @media (min-width: 426px) and (max-width: 1023px) {
    background: transparent;
    margin-left: auto;
    margin-right: 48px;
    padding: 0;
  }
  @media (min-width: 1024px) {
    background: transparent;
    padding: 0;
    margin-left: auto;
    justify-content: flex-end;
  }
`;

export const Name = styled.button`
  padding: 0;
  border: ${p => p.theme.borders.none};
  font-family: ${p => p.theme.fonts.tertiary};
  line-height: ${p => p.theme.lineHeights.body};
  font-size: ${p => p.theme.fontSizes[0]};
  text-align: right;
  letter-spacing: 0.04em;
  background: transparent;
  color: ${p => p.theme.colors.black};
  @media (min-width: 426px) and (max-width: 1023px) {
    background: transparent;
  }
  @media (min-width: 1024px) {
    background: transparent;
  }
`;

export const Exit = styled.button`
  padding: 0;
  border: ${p => p.theme.borders.none};
  font-family: ${p => p.theme.fonts.tertiary};
  line-height: ${p => p.theme.lineHeights.body};
  font-size: ${p => p.theme.fontSizes[0]};
  text-align: right;
  letter-spacing: 0.04em;
  background: transparent;

  color: ${p => p.theme.colors.black};
  position: relative;
  cursor: pointer;
  &:hover {
    color: ${p => p.theme.colors.gray};
  }
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -16px;
    height: 25px;
    width: 1px;
    background-color: #bbb;
    border-radius: 5px;
  }

  @media (min-width: 426px) and (max-width: 1023px) {
    background: transparent;
  }
  @media (min-width: 1024px) {
    background: transparent;
  }
`;
