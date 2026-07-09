import { useNavigate, useLocation, useSearchParams } from "react-router";
import { useFollowing } from "./useFollowing";
import { usePagination } from "@hooks";
import * as S from "./FollowingPage.styles";

const FollowingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const pageParam = searchParams.get("page");
    const currentPageFromUrl = pageParam ? parseInt(pageParam, 10) || 1 : 1;

    const initialTotalCount = location.state?.totalCount;
    const { username, following, totalCount, isFetching } = useFollowing(currentPageFromUrl, initialTotalCount);

    const { currentPage, setCurrentPage, totalPages, displayedItems: displayedFollowing } = usePagination(
        following,
        12,
        totalCount,
        username
    );

    if (isFetching) {
        return (
            <section className="panel content-panel">
                <div className="glyph-band">
                    <span className="glyph-dot" />
                    <span>Accessing Neural Network for subscriptions...</span>
                </div>
            </section>
        );
    }

    return (
        <section className="panel content-panel">
            <S.FollowingHeaderRow>
                <S.PillBackBtn onClick={() => navigate(`/profile/${username}`)}>
                    ← BACK TO PROFILE
                </S.PillBackBtn>
                <div className="search-badge" style={{ alignSelf: "flex-start", marginTop: "12px" }}>SUBSCRIPTIONS</div>
                <h2 className="page-title">{username} follows</h2>
            </S.FollowingHeaderRow>

            <S.FollowingListContainer>
                {following.length > 0 ? (
                    <>
                        <S.FollowingGrid>
                            {displayedFollowing.map((followedUser) => (
                                <S.FollowingCard key={followedUser.id} onClick={() => navigate(`/profile/${followedUser.login}`)}>
                                    <S.FollowingCardContent>
                                        <S.FollowingAvatarContainer>
                                            <S.FollowingAvatar
                                                src={followedUser.avatar_url}
                                                alt={`${followedUser.login}'s avatar`}
                                                loading="lazy"
                                            />
                                        </S.FollowingAvatarContainer>
                                        <S.FollowingInfo>
                                            <S.FollowingUsername>
                                                {followedUser.login}
                                            </S.FollowingUsername>
                                            <S.FollowingGithubLink
                                                href={followedUser.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                GitHub Profile ↗
                                            </S.FollowingGithubLink>
                                        </S.FollowingInfo>
                                    </S.FollowingCardContent>
                                </S.FollowingCard>
                            ))}
                        </S.FollowingGrid>

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
                    <div className="status-text">Not following any users.</div>
                )}
            </S.FollowingListContainer>
        </section>
    );
};

export default FollowingPage;
