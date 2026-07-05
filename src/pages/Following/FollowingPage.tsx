import { useNavigate, Link } from "react-router";
import { useFollowing } from "./useFollowing";
import { usePagination } from "@hooks";
import "./FollowingPage.css";

const FollowingPage = () => {
    const navigate = useNavigate();
    const { username, following, isFetching } = useFollowing();
    const { currentPage, setCurrentPage, totalPages, displayedItems: displayedFollowing } = usePagination(following, 12, username);

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
            <div className="following-header-row">
                <button className="pill-back-btn" onClick={() => navigate(`/profile/${username}`)}>
                    ← BACK TO PROFILE
                </button>
                <div className="search-badge" style={{ alignSelf: "flex-start", marginTop: "12px" }}>SUBSCRIPTIONS</div>
                <h2 className="page-title">{username} follows</h2>
            </div>

            <div className="following-list-container">
                {following.length > 0 ? (
                    <>
                        <div className="following-grid">
                            {displayedFollowing.map((followedUser) => (
                                <div key={followedUser.id} className="following-card">
                                    <div className="following-card-content">
                                        <div className="following-avatar-container">
                                            <img
                                                className="following-avatar"
                                                src={followedUser.avatar_url}
                                                alt={`${followedUser.login}'s avatar`}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="following-info">
                                            <Link to={`/profile/${followedUser.login}`} className="following-username">
                                                {followedUser.login}
                                            </Link>
                                            <a
                                                className="following-github-link"
                                                href={followedUser.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                GitHub Profile ↗
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination-container">
                                <button
                                    className="pagination-btn"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                >
                                    PREV
                                </button>
                                <span className="pagination-info">
                                    PAGE {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                                </span>
                                <button
                                    className="pagination-btn"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    NEXT
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="status-text">Not following any users.</div>
                )}
            </div>
        </section>
    );
};

export default FollowingPage;
