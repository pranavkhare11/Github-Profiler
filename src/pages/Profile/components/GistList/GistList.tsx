import { useGistList } from "./useGistList";
import { usePagination } from "@hooks";
import "./GistList.css";

interface GistListProps {
    login: string;
}

const GistList = ({ login }: GistListProps) => {
    const { gists, isFetching } = useGistList(login);
    const { currentPage, setCurrentPage, totalPages, displayedItems: displayedGists } = usePagination(gists, 10, login);

    if (isFetching) {
        return (
            <div className="glyph-band">
                <span className="glyph-dot" />
                <span>Fetching gists from Neural Spine...</span>
            </div>
        );
    }

    return (
        <div className="gists-list-container">
            {gists.length > 0 ? (
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {displayedGists.map((gist) => {
                            const fileNames = Object.keys(gist.files);
                            const displayTitle = gist.description || (fileNames.length > 0 ? fileNames[0] : "Unnamed Gist");
                            return (
                                <div key={gist.id} className="gist-card">
                                    <div className="gist-card-header">
                                        <a
                                            href={gist.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="gist-link"
                                        >
                                            {displayTitle}
                                        </a>
                                        <span className="repo-dot-status" />
                                    </div>
                                    <div className="gist-meta-row">
                                        {fileNames.map((fileName) => (
                                            <span key={fileName} className="gist-file-tag">
                                                {fileName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
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
                <div className="status-text">No public gists found.</div>
            )}
        </div>
    );
};

export default GistList;
