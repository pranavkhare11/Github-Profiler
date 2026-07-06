import styled from "styled-components";

export const ProfileCardWrapper = styled.div`
  margin-bottom: 24px;
`;

export const MetaChip = styled.div`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  border: 1px solid #f3b3bb;
  background: var(--red-soft);
  color: #981321;
  border-radius: 999px;
  font-family: var(--font-dot);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 10px;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: var(--red);
  }
`;

export const ProfileDetailsCard = styled.div`
  display: flex;
  gap: 28px;
  padding: 24px;
  background: 
    radial-gradient(var(--white-4) 1.2px, transparent 1.2px),
    linear-gradient(135deg, var(--white-1), var(--white-2));
  background-size: 10px 10px, 100% 100%;
  border: 1px solid var(--line);
  border-radius: 20px;
  box-shadow: var(--shadow-soft);
  margin-bottom: 24px;
  align-items: flex-start;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
  }
`;

export const ProfileAvatarZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileAvatarCoilRing = styled.div`
  position: relative;
  width: 136px;
  height: 136px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: repeating-radial-gradient(
    circle,
    transparent,
    transparent 3px,
    var(--line-2) 3px,
    var(--line-2) 4px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.03);
`;

export const ProfileLensWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  padding: 4px;
  background: radial-gradient(circle at 35% 35%, #fbfbfb, #e5e5e5 75%);
  border: 2px solid var(--line-2);
  box-shadow: 0 4px 10px rgba(0,0,0,0.06), inset 0 2px 4px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0,0,0,0.08);
`;

export const ProfileLensReflection = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
`;

export const ProfileRedIndicator = styled.span`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  background: var(--red);
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(209, 31, 47, 0.4);
`;

export const ProfileInfoZone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileMetaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 840px) {
    justify-content: center;
  }
`;

export const ProfileUsernameTag = styled.span`
  font-family: var(--font-dot);
  font-size: 0.78rem;
  color: var(--text-faint);
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const ProfileLocationTag = styled.span`
  font-family: var(--font-dot);
  font-size: 0.7rem;
  color: #707070;
  border: 1px solid var(--line-2);
  border-radius: 4px;
  padding: 2px 6px;
  background: var(--white-3);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const ProfileName = styled.h1`
  margin: 0;
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #111111;
`;

export const ProfileBio = styled.p`
  margin: 4px 0 10px;
  font-size: 0.94rem;
  color: var(--text-soft);
  line-height: 1.45;
  max-width: 600px;
`;

export const EmailValue = styled.a`
  color: var(--text-main);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px dotted var(--text-faint);

  &:hover {
    color: var(--red);
    border-color: var(--red);
  }
`;

export const ProfileTextDetail = styled.p<{ $clickable?: boolean }>`
  margin: 5px 0;
  font-size: 0.96rem;
  color: var(--text-soft);
  
  ${props => props.$clickable && `
    cursor: pointer;
    display: inline-block;
    transition: all 0.15s ease;

    &:hover {
      color: var(--text-main);
      text-decoration: underline;
    }
  `}

  @media (max-width: 840px) {
    ${props => props.children?.toString().startsWith("Email:") && `
      display: flex;
      justify-content: center;
    `}
  }
`;

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  width: 100%;
`;

export const RecentSearchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
  text-align: left;
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
  width: 100%;
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
