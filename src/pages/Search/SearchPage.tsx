import { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "@pages/Search/components/SearchBar/SearchBar";
import { useRecentSearches, type RecentSearchItem } from "@hooks";
import * as S from "./SearchPage.styles";

const SearchPage = () => {
    const navigate = useNavigate();
    const { recentSearches, addSearch, clearSearches } = useRecentSearches();
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);

    const handleRecentClick = (item: RecentSearchItem) => {
        addSearch(item);
        navigate(`/profile/${encodeURIComponent(item.login)}`);
    };

    return (
        <S.SearchPageContainer>
            <S.SearchHeader>
                <S.SearchBadge>SEARCH</S.SearchBadge>
                <S.SearchTitle>GitHub user lookup</S.SearchTitle>
            </S.SearchHeader>
            <S.SearchSubtitle>
                Search any GitHub username and open the profile instantly with smart suggestions.
            </S.SearchSubtitle>
            <SearchBar onSuggestionsVisibilityChange={setSuggestionsVisible} />

            {!suggestionsVisible && recentSearches.length > 0 && (
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
        </S.SearchPageContainer>
    );
};

export default SearchPage;
