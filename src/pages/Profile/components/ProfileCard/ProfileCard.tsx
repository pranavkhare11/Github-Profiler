import { useProfileCard } from "./useProfileCard";
import type { GitHubUserProfile } from "@app-types/github";
import { useRecentSearches, type RecentSearchItem } from "@hooks";
import * as S from "./ProfileCard.styles";

interface ProfileCardProps {
    login: string;
    onProfileLoaded: (profile: GitHubUserProfile | null) => void;
    onFetching: (isFetching: boolean) => void;
}

const ProfileCard = ({ login, onProfileLoaded, onFetching }: ProfileCardProps) => {
    const { userprofile, isFetching, navigate } = useProfileCard({
        login,
        onProfileLoaded,
        onFetching,
    });

    const { recentSearches, addSearch, clearSearches } = useRecentSearches();

    const handleRecentClick = (item: RecentSearchItem) => {
        addSearch(item);
        navigate(`/profile/${encodeURIComponent(item.login)}`);
    };

    return (
        <>
            {isFetching ? (
                <div className="glyph-band">
                    <span className="glyph-dot" />
                    <span>Fetching profile from Neural Spine<span className="loading-dots" /></span>
                </div>
            ) : userprofile ? (
                <S.ProfileCardWrapper>
                    <S.MetaChip>Profile</S.MetaChip>
                    <S.ProfileDetailsCard>
                        <S.ProfileAvatarZone>
                            <S.ProfileAvatarCoilRing>
                                <S.ProfileLensWrapper>
                                    <S.ProfileAvatarImg src={userprofile.avatar_url} alt={userprofile.login} />
                                    <S.ProfileLensReflection />
                                    <S.ProfileRedIndicator />
                                </S.ProfileLensWrapper>
                            </S.ProfileAvatarCoilRing>
                        </S.ProfileAvatarZone>

                        <S.ProfileInfoZone>
                            <S.ProfileMetaHeader>
                                <S.ProfileUsernameTag>@{userprofile.login}</S.ProfileUsernameTag>
                                {userprofile.location && <S.ProfileLocationTag>{userprofile.location}</S.ProfileLocationTag>}
                            </S.ProfileMetaHeader>
                            <S.ProfileName>{userprofile.name || userprofile.login}</S.ProfileName>
                            {userprofile.bio && <S.ProfileBio>{userprofile.bio}</S.ProfileBio>}

                            <S.ProfileTextDetail $clickable onClick={() => navigate(`/profile/${userprofile.login}/followers`, { state: { totalCount: userprofile.followers } })}>
                                Followers: {userprofile.followers}
                            </S.ProfileTextDetail>
                            <S.ProfileTextDetail $clickable onClick={() => navigate(`/profile/${userprofile.login}/following`, { state: { totalCount: userprofile.following } })}>
                                Following: {userprofile.following}
                            </S.ProfileTextDetail>
                            {userprofile.email && (
                                <S.ProfileTextDetail>
                                    Email: <S.EmailValue href={`mailto:${userprofile.email}`}>{userprofile.email}</S.EmailValue>
                                </S.ProfileTextDetail>
                            )}
                        </S.ProfileInfoZone>
                    </S.ProfileDetailsCard>
                </S.ProfileCardWrapper>
            ) : (
                <S.NotFoundWrapper>
                    <div className="status-text">No profile found</div>
                    {recentSearches.length > 0 && (
                        <S.RecentSearchesContainer>
                            <S.RecentSearchesHeader>
                                <S.RecentSearchesTitle>Recent Searches</S.RecentSearchesTitle>
                                <S.RecentSearchesClear onClick={clearSearches}>Clear All</S.RecentSearchesClear>
                            </S.RecentSearchesHeader>
                            <S.RecentSearchesGrid>
                                {recentSearches.map((item) => (
                                    <S.RecentSearchCard key={item.login} onClick={() => handleRecentClick(item)}>
                                        <S.RecentSearchCardContent>
                                            <S.RecentSearchAvatarContainer>
                                                <S.RecentSearchAvatar
                                                    src={item.avatar_url}
                                                    alt={`${item.login}'s avatar`}
                                                    loading="lazy"
                                                />
                                            </S.RecentSearchAvatarContainer>
                                            <S.RecentSearchInfo>
                                                <S.RecentSearchUsername>
                                                    {item.login}
                                                </S.RecentSearchUsername>
                                                <S.RecentSearchGithubLink
                                                    href={item.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    GitHub Profile ↗
                                                </S.RecentSearchGithubLink>
                                            </S.RecentSearchInfo>
                                        </S.RecentSearchCardContent>
                                    </S.RecentSearchCard>
                                ))}
                            </S.RecentSearchesGrid>
                        </S.RecentSearchesContainer>
                    )}
                </S.NotFoundWrapper>
            )}
        </>
    );
};

export default ProfileCard;
