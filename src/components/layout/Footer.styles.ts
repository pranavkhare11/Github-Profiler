import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  max-width: var(--shell-max);
  margin: auto auto 0;
  padding: 0;
`;

export const FooterContent = styled.div`
  min-height: 68px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FooterBrand = styled.span`
  font-family: var(--font-dot);
  letter-spacing: 0.13em;
  color: #1d1d1d;
  text-transform: uppercase;
`;

export const FooterSigns = styled.span`
  color: #787878;
  font-size: 0.82rem;
`;
