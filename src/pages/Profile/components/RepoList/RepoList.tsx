import { useRepoList } from "./useRepoList";
import { usePagination } from "@hooks";
import "./RepoList.css";

interface RepoListProps {
    login: string;
}

const RepoList = ({ login }: RepoListProps) => {
    const { repos, isFetching } = useRepoList(login);
    const { currentPage, setCurrentPage, totalPages, displayedItems: displayedRepos } = usePagination(repos, 10, login);

    if (isFetching) {
        return (
            <div className="glyph-band">
                <span className="glyph-dot" />
                <span>Fetching repositories from Neural Spine...</span>
            </div>
        );
    }

    return (
        <div className="repos-list-container">
            {repos.length > 0 ? (
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {displayedRepos.map((repo) => (
                            <div key={repo.id} className="repo-card">
                                <div className="repo-card-header">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="repo-link"
                                    >
                                        {repo.name}
                                    </a>
                                    <span className="repo-dot-status" />
                                </div>
                                {repo.description && <p className="repo-desc">{repo.description}</p>}
                                <div className="repo-meta-row">
                                    {repo.language && <span className="repo-lang-tag">{repo.language}</span>}
                                    <span className="repo-stat-tag">★ {repo.stargazers_count}</span>
                                    <span className="repo-stat-tag">⑂ {repo.forks_count}</span>
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
                <div className="status-text">No public repositories found.</div>
            )}
        </div>
    );
};

export default RepoList;
