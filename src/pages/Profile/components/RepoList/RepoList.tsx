import { useRepoList } from "./useRepoList";
import { usePagination } from "@hooks";
import * as S from "./RepoList.styles";

interface RepoListProps {
    login: string;
}

const RepoList = ({ login }: RepoListProps) => {
    const { repos, isFetching } = useRepoList(login);
    const { currentPage, setCurrentPage, totalPages, displayedItems: displayedRepos } = usePagination(repos, 10, login, `/profile/${login}/repos`);

    if (isFetching) {
        return (
            <div className="glyph-band">
                <span className="glyph-dot" />
                <span>Fetching repositories from Neural Spine...</span>
            </div>
        );
    }

    return (
        <S.ReposListContainer>
            {repos.length > 0 ? (
                <>
                    <S.ReposListWrapper>
                        {displayedRepos.map((repo) => (
                            <S.RepoCard
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <S.RepoCardHeader>
                                    <S.RepoName className="repo-name-text">
                                        {repo.name}
                                    </S.RepoName>
                                    <S.RepoDotStatus />
                                </S.RepoCardHeader>
                                {repo.description && <S.RepoDesc>{repo.description}</S.RepoDesc>}
                                <S.RepoMetaRow>
                                    {repo.language && <S.RepoLangTag>{repo.language}</S.RepoLangTag>}
                                    <S.RepoStatTag>★ {repo.stargazers_count}</S.RepoStatTag>
                                    <S.RepoStatTag>⑂ {repo.forks_count}</S.RepoStatTag>
                                </S.RepoMetaRow>
                            </S.RepoCard>
                        ))}
                    </S.ReposListWrapper>

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
                <div className="status-text">No public repositories found.</div>
            )}
        </S.ReposListContainer>
    );
};

export default RepoList;
