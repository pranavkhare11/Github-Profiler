import styled from "styled-components";

export const ProfileTabsFlex = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 14px;
`;

export const ProfileTabPill = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border: 1px solid var(--line-2);
  border-radius: 99px;
  background: linear-gradient(180deg, var(--white-1), var(--white-2));
  font-family: var(--font-dot);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--text-soft);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);

  &:hover {
    border-color: var(--text-main);
    color: var(--text-main);
    background: var(--white-3);
    transform: translateY(-1px);
  }

  ${props => props.$active && `
    border-color: var(--text-main);
    background: var(--white-1);
    color: var(--text-main);
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  `}
`;

export const TabActiveDot = styled.span`
  width: 6px;
  height: 6px;
  background: var(--red);
  border-radius: 50%;
  box-shadow: 0 0 4px var(--red);
  margin-right: 6px;
`;

export const TabViewContent = styled.div`
  margin-top: 20px;
`;
