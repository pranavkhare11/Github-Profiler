import { useGistList } from "./useGistList";
import { usePagination } from "@hooks";
import * as S from "./GistList.styles";

interface GistListProps {
    login: string;
}

const GistList = ({ login }: GistListProps) => {
    const { gists, isFetching } = useGistList(login);
    const { currentPage, setCurrentPage, totalPages, displayedItems: displayedGists } = usePagination(gists, 10, login, `/profile/${login}/gists`);

    if (isFetching) {
        return (
            <div className="glyph-band">
                <span className="glyph-dot" />
                <span>Fetching gists from Neural Spine...</span>
            </div>
        );
    }

    return (
        <S.GistsListContainer>
            {gists.length > 0 ? (
                <>
                    <S.GistsListWrapper>
                        {displayedGists.map((gist) => {
                            const fileNames = Object.keys(gist.files);
                            const displayTitle = gist.description || (fileNames.length > 0 ? fileNames[0] : "Unnamed Gist");
                            return (
                                <S.GistCard
                                    key={gist.id}
                                    href={gist.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <S.GistCardHeader>
                                        <S.GistName className="gist-name-text">
                                            {displayTitle}
                                        </S.GistName>
                                        <S.RepoDotStatus />
                                    </S.GistCardHeader>
                                    <S.GistMetaRow>
                                        {fileNames.map((fileName) => (
                                            <S.GistFileTag key={fileName}>
                                                {fileName}
                                            </S.GistFileTag>
                                        ))}
                                    </S.GistMetaRow>
                                </S.GistCard>
                            );
                        })}
                    </S.GistsListWrapper>

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
                <div className="status-text">No public gists found.</div>
            )}
        </S.GistsListContainer>
    );
};

export default GistList;
