import styled, { keyframes } from "styled-components";

const pulseLed = keyframes`
  0%, 100% { opacity: 0.6; box-shadow: 0 0 3px var(--red); }
  50% { opacity: 1; box-shadow: 0 0 8px var(--red); }
`;

export const ToggleContainer = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.92);
  }

  &:focus-visible {
    outline: 2px solid var(--text-main);
    outline-offset: 3px;
  }
`;

export const ToggleDial = styled.div<{ $theme: "light" | "dark" }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line-2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$theme === "light" 
    ? "linear-gradient(135deg, #ffffff, #e6e6e6)" 
    : "linear-gradient(135deg, #222222, #111111)"};
  box-shadow: ${props => props.$theme === "light"
    ? "0 2px 5px rgba(0,0,0,0.08), inset 0 1px 1px #ffffff"
    : "0 2px 8px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)"};
  
  /* Mechanically rotate the dial and indicator dot by 180 degrees in dark mode */
  transform: rotate(${props => props.$theme === "dark" ? "180deg" : "0deg"});
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), 
              background 0.3s ease, 
              border-color 0.3s ease, 
              box-shadow 0.3s ease;
`;

export const DialMarking = styled.span<{ $index: number }>`
  position: absolute;
  width: 1px;
  height: 3px;
  background-color: var(--line-2);
  opacity: 0.8;
  transition: background-color 0.3s ease;

  ${props => props.$index === 1 && `
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
  `}
  ${props => props.$index === 2 && `
    right: 2px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
  `}
  ${props => props.$index === 3 && `
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
  `}
  ${props => props.$index === 4 && `
    left: 2px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
  `}
`;

export const IconWrapper = styled.div<{ $theme: "light" | "dark" }>`
  width: 13px;
  height: 13px;
  color: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Counter-rotate the icon wrapper by -180 degrees so the sun/moon icon stays upright */
  transform: rotate(${props => props.$theme === "dark" ? "-180deg" : "0deg"});
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const LedIndicator = styled.span<{ $theme: "light" | "dark" }>`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--red);
  box-shadow: 0 0 4px var(--red);
  
  /* In dark mode, LED has active pulse glow */
  animation: ${pulseLed} 2s infinite ease-in-out;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;
