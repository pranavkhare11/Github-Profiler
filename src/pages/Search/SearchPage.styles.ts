import styled from "styled-components";

export const SearchPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 24px 0;
`;

export const SearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SearchBadge = styled.div`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: var(--red-soft);
  color: var(--red);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const SearchTitle = styled.h2`
  font-size: 32px;
  line-height: 1.05;
  margin: 0;
  color: var(--text-main);
  transition: color 0.3s ease;
`;

export const SearchSubtitle = styled.p`
  max-width: 720px;
  font-size: 16px;
  color: var(--text-soft);
  margin: 0;
  transition: color 0.3s ease;
`;

export const RecentSearchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
`;

export const RecentSearchesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RecentSearchesTitle = styled.span`
  font-family: var(--font-dot);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--text-faint);
  text-transform: uppercase;
`;

export const RecentSearchesClear = styled.button`
  background: transparent;
  border: 0;
  font-family: var(--font-dot);
  font-size: 0.68rem;
  color: var(--text-faint);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--red);
    background: var(--red-soft);
  }
`;

export const RecentSearchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 4px;
`;

export const RecentSearchCard = styled.div`
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

export const RecentSearchCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RecentSearchAvatarContainer = styled.div`
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

export const RecentSearchAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const RecentSearchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RecentSearchUsername = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--black-main);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent-red);
    text-decoration: underline;
  }
`;

export const RecentSearchGithubLink = styled.a`
  font-size: 0.75rem;
  color: var(--text-faint);
  text-decoration: none;
  font-family: var(--font-dot);
  letter-spacing: 0.05em;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-main);
  }
`;
