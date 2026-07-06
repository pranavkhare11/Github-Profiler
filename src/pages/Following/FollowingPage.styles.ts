import styled from "styled-components";

export const FollowingHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const PillBackBtn = styled.button`
  align-self: flex-start;
  background: transparent;
  border: 1px solid var(--line-2);
  color: var(--grey-text);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--black-main);
    border-color: var(--black-main);
    background: rgba(0, 0, 0, 0.02);
  }
`;

export const FollowingListContainer = styled.div`
  margin-top: 16px;
`;

export const FollowingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const FollowingCard = styled.div`
  background: 
    radial-gradient(var(--white-3) 1px, transparent 1px),
    linear-gradient(170deg, var(--white-1), var(--white-2));
  background-size: 12px 12px, 100% 100%;
  border: 1px solid var(--line-2);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: var(--black-main);
  }
`;

export const FollowingCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const FollowingAvatarContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px dashed var(--line-2);
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white-1);
`;

export const FollowingAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const FollowingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FollowingUsername = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--black-main);
  text-decoration: none;
  transition: color 0.2s ease;

  a&, & a {
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    color: var(--accent-red);
    text-decoration: underline;
  }
`;

export const FollowingGithubLink = styled.a`
  font-size: 0.75rem;
  color: var(--grey-text);
  text-decoration: none;
  letter-spacing: 0.03em;

  &:hover {
    color: var(--black-main);
    text-decoration: underline;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 8px 0;
`;

export const PaginationBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border: 1px solid var(--line-2);
  border-radius: 99px;
  background: var(--white-1);
  font-family: var(--font-dot);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--text-soft);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover:not(:disabled) {
    border-color: var(--text-main);
    color: var(--text-main);
    background: var(--white-3);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  font-family: var(--font-dot);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: var(--text-faint);
`;
