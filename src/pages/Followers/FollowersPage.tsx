import { useNavigate, Link } from "react-router";
import { useFollowers } from "./useFollowers";
import { usePagination } from "@hooks";
import "./FollowersPage.css";

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
            <div className="followers-header-row">
                <button className="pill-back-btn" onClick={() => navigate(`/profile/${username}`)}>
                    ← BACK TO PROFILE
                </button>
                <div className="search-badge" style={{ alignSelf: "flex-start", marginTop: "12px" }}>SUBSCRIBERS</div>
                <h2 className="page-title">{username}'s followers</h2>
            </div>

            <div className="followers-list-container">
                {followers.length > 0 ? (
                    <>
                        <div className="followers-grid">
                            {displayedFollowers.map((follower) => (
                                <div key={follower.id} className="follower-card">
                                    <div className="follower-card-content">
                                        <div className="follower-avatar-container">
                                            <img
                                                className="follower-avatar"
                                                src={follower.avatar_url}
                                                alt={`${follower.login}'s avatar`}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="follower-info">
                                            <Link to={`/profile/${follower.login}`} className="follower-username">
                                                {follower.login}
                                            </Link>
                                            <a
                                                className="follower-github-link"
                                                href={follower.html_url}
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
                    <div className="status-text">No followers found.</div>
                )}
            </div>
        </section>
    );
};

export default FollowersPage;
