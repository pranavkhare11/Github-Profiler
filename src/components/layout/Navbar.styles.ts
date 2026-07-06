import styled, { keyframes, css } from "styled-components";

const pulseWave = keyframes`
  0% { transform: scaleY(0.3); opacity: 0.6; }
  100% { transform: scaleY(1.1); opacity: 1; }
`;

const blinkLed = keyframes`
  0%, 100% { opacity: 0.4; box-shadow: 0 0 2px var(--red); }
  50% { opacity: 1; box-shadow: 0 0 6px var(--red); }
`;

export const NavbarContainer = styled.nav`
  width: 100%;
  max-width: var(--shell-max);
  margin: 0 auto 14px;
  padding: 14px 18px;
  overflow: visible;
`;

export const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const BrandLeftLink = styled.div`
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  cursor: pointer;

  a&, & a {
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 840px) {
    align-self: flex-start;
  }
`;

export const BrandLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BrandLens = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #555555, #111111 80%);
  border: 2px solid var(--line-2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.4);
`;

export const LensInner = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #3a3a3a, #0c0c0c 90%);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const BrandTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

export const BrandTitle = styled.h1`
  margin: 0;
  font-family: var(--font-dot);
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const BrandSubtitleSpec = styled.span`
  font-family: var(--font-dot);
  font-size: 0.58rem;
  color: var(--text-faint);
  letter-spacing: 0.12em;
  margin-top: 1px;
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 840px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const NavbarSearchContainer = styled.div`
  min-width: 320px;
  max-width: 420px;
  position: relative;

  @media (max-width: 840px) {
    width: 100%;
    max-width: 100%;
    min-width: 0;

    .searchbar-control, .searchbar-control:focus {
      width: 100%;
    }
  }
`;

export const NavbarDecor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 840px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const DecorSpecGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: var(--font-dot);
  line-height: 1.3;
`;

export const DecorSpecLabel = styled.span`
  font-size: 0.62rem;
  color: var(--text-faint);
  letter-spacing: 0.08em;
`;

export const DecorSpecStatus = styled.span`
  font-size: 0.56rem;
  color: var(--text-faint);
  letter-spacing: 0.06em;
`;

export const DecorGlyphDial = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #111111;
  border: 1px solid var(--line-2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0 4px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
`;

export const WaveformLine = styled.div<{ $index: number }>`
  width: 2px;
  background: #ffffff;
  border-radius: 1px;
  
  ${props => props.$index === 1 && css`
    height: 10px;
    animation: ${pulseWave} 1.2s ease-in-out infinite alternate;
  `}
  ${props => props.$index === 2 && css`
    height: 18px;
    animation: ${pulseWave} 0.8s ease-in-out infinite alternate;
  `}
  ${props => props.$index === 3 && css`
    height: 24px;
    animation: ${pulseWave} 1s ease-in-out infinite alternate;
  `}
  ${props => props.$index === 4 && css`
    height: 14px;
    animation: ${pulseWave} 0.9s ease-in-out infinite alternate;
  `}
  ${props => props.$index === 5 && css`
    height: 8px;
    animation: ${pulseWave} 1.1s ease-in-out infinite alternate;
  `}
`;

export const DecorHardwareGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DecorLed = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 6px var(--red);
  animation: ${blinkLed} 2s infinite ease-in-out;
`;

export const DecorScrew = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e0e0e0;
  border: 1px solid var(--line-2);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    height: 1px;
    background: #888888;
    transform: translateY(-50%) rotate(45deg);
  }
`;

export const DecorShapePill = styled.span`
  width: 14px;
  height: 6px;
  border-radius: 99px;
  background: var(--line-2);
  border: 1px solid #b1b1b1;
`;
