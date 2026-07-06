import styled from "styled-components";

export const ReposListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReposListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RepoCard = styled.a`
  background: 
    radial-gradient(var(--white-3) 1px, transparent 1px),
    linear-gradient(170deg, var(--white-1), var(--white-2));
  background-size: 12px 12px, 100% 100%;
  border: 1px solid var(--line-2);
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: var(--text-main);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
    background-image: 
      radial-gradient(var(--line-2) 1px, transparent 1px),
      linear-gradient(170deg, var(--white-1), var(--white-2));

    .repo-name-text {
      text-decoration: underline;
    }
  }
`;

export const RepoCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RepoName = styled.span`
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--text-main);
  text-decoration: none;
  letter-spacing: -0.01em;
`;

export const RepoDotStatus = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00cc66;
  box-shadow: 0 0 6px #00cc66;
`;

export const RepoDesc = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: var(--text-soft);
  line-height: 1.4;
`;

export const RepoMetaRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 4px;
`;

export const RepoLangTag = styled.span`
  font-family: var(--font-dot);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: var(--text-faint);
  text-transform: uppercase;
  background: var(--white-3);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--line-2);
`;

export const RepoStatTag = styled.span`
  font-family: var(--font-dot);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: var(--text-faint);
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 3px;
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
