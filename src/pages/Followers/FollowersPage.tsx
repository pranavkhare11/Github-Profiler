import { useNavigate } from "react-router";
import { useFollowers } from "./useFollowers";
import { usePagination } from "@hooks";
import * as S from "./FollowersPage.styles";

const FollowersPage = () => {
    const navigate = useNavigate();
    const { username, followers, isFetching } = useFollowers();
    const { currentPage, setCurrentPage, totalPages, displayedItems: displayedFollowers } = usePagination(followers, 12, username);

    if (isFetching) {
        return (
            <section className="panel content-panel">
                <div className="glyph-band">
                    <span className="glyph-dot" />
                    <span>Accessing Neural Network for followers...</span>
                </div>
            </section>
        );
    }

    return (
        <section className="panel content-panel">
            <S.FollowersHeaderRow>
                <S.PillBackBtn onClick={() => navigate(`/profile/${username}`)}>
                    ← BACK TO PROFILE
                </S.PillBackBtn>
                <div className="search-badge" style={{ alignSelf: "flex-start", marginTop: "12px" }}>SUBSCRIBERS</div>
                <h2 className="page-title">{username}'s followers</h2>
            </S.FollowersHeaderRow>

            <S.FollowersListContainer>
                {followers.length > 0 ? (
                    <>
                        <S.FollowersGrid>
                            {displayedFollowers.map((follower) => (
                                <S.FollowerCard key={follower.id} onClick={() => navigate(`/profile/${follower.login}`)}>
                                    <S.FollowerCardContent>
                                        <S.FollowerAvatarContainer>
                                            <S.FollowerAvatar
                                                src={follower.avatar_url}
                                                alt={`${follower.login}'s avatar`}
                                                loading="lazy"
                                            />
                                        </S.FollowerAvatarContainer>
                                        <S.FollowerInfo>
                                            <S.FollowerUsername>
                                                {follower.login}
                                            </S.FollowerUsername>
                                            <S.FollowerGithubLink
                                                href={follower.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                GitHub Profile ↗
                                            </S.FollowerGithubLink>
                                        </S.FollowerInfo>
                                    </S.FollowerCardContent>
                                </S.FollowerCard>
                            ))}
                        </S.FollowersGrid>

                        {totalPages > 1 && (
                            <S.PaginationContainer>
                                <S.PaginationBtn
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                >
                                    PREV
                                </S.PaginationBtn>
                                <S.PaginationInfo>
                                    PAGE {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                                </S.PaginationInfo>
                                <S.PaginationBtn
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    NEXT
                                </S.PaginationBtn>
                            </S.PaginationContainer>
                        )}
                    </>
                ) : (
                    <div className="status-text">No followers found.</div>
                )}
            </S.FollowersListContainer>
        </section>
    );
};

export default FollowersPage;
