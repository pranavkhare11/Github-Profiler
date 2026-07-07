import styled from "styled-components";

export const SearchBarContainer = styled.div<{ $stacked?: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.$stacked ? "1fr" : "1fr auto"};
  gap: 10px;
  align-items: start;
  position: relative;
`;

export const SearchBarControl = styled.input`
  height: 44px;
  border: 1px solid var(--line-2);
  border-radius: 16px;
  background: linear-gradient(170deg, var(--white-1), var(--white-2));
  padding: 0 14px;
  color: var(--text-main);
  font-size: 0.98rem;
  width: 100%;

  &::placeholder {
    color: #8a8a8a;
  }

  &:focus-visible {
    outline: 2px solid var(--text-main);
    outline-offset: 2px;
  }
`;

export const SearchBarButton = styled.button`
  height: 44px;
  min-width: 118px;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  background:
    linear-gradient(140deg, #292929, #1b1b1b),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1), transparent 60%);
  color: #fafafa;
  font-family: var(--font-dot);
  letter-spacing: 0.11em;
  text-transform: uppercase;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--text-main);
    outline-offset: 2px;
  }
`;

export const SearchBarResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  margin-top: 6px;
  background: 
    radial-gradient(var(--dropdown-dot) 1px, transparent 1px),
    var(--dropdown-bg);
  background-size: 8px 8px, 100% 100%;
  backdrop-filter: blur(12px);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-size: 0.9rem;
  color: var(--text-faint);
`;

export const SearchBarHelper = styled.div`
  padding: 12px 16px;
  color: var(--text-soft);
  font-family: var(--font-dot);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const SearchBarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--line-2);
    border-radius: 99px;

    &:hover {
      background: var(--text-faint);
    }
  }
`;

export const SearchBarItem = styled.button`
  display: flex;
  width: 100%;
  border: 0;
  background: transparent;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  color: var(--text-main);
  text-align: left;
  border-bottom: 1px solid var(--line);
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: var(--white-4);
  }

  &:focus-visible {
    outline: 2px solid var(--text-main);
    outline-offset: 2px;
  }
`;

export const SearchBarAvatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line);
`;
