import { useEffect, useState } from "react";
import api from "../../api/client";
import { GITHUB_ENDPOINTS } from "../../constants/endpoints";
import type { GitHubGist } from "../../types/github";

interface GistListProps {
    login: string;
}

const GistList = ({ login }: GistListProps) => {
    const [gists, setGists] = useState<GitHubGist[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const controller = new AbortController();

        const fetchGists = async () => {
            try {
                setIsFetching(true);
                const response = await api.get(GITHUB_ENDPOINTS.userGists(login), {
                    params: { per_page: 100 },
                    signal: controller.signal,
                });
                setGists(response.data);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching gists:", error);
                    setGists([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsFetching(false);
                }
            }
        };

        if (login) {
            fetchGists();
        }

        return () => {
            controller.abort();
        };
    }, [login]);

    useEffect(() => {
        setCurrentPage(1);
    }, [login]);

    if (isFetching) {
        return (
            <div className="glyph-band">
                <span className="glyph-dot" />
                <span>Fetching gists from Neural Spine...</span>
            </div>
        );
    }

    const totalPages = Math.ceil(gists.length / itemsPerPage);
    const displayedGists = gists.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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