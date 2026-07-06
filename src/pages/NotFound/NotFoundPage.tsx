import { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "@pages/Search/components/SearchBar/SearchBar";
import { useRecentSearches, type RecentSearchItem } from "@hooks";
import * as S from "./NotFoundPage.styles";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { recentSearches, addSearch, clearSearches } = useRecentSearches();
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);

    const handleRecentClick = (item: RecentSearchItem) => {
        addSearch(item);
        navigate(`/profile/${encodeURIComponent(item.login)}`);
    };

    return (
        <S.NotFoundContainer>
            <S.NotFoundTitle>Page not found</S.NotFoundTitle>
            <S.NotFoundText>The route you requested does not exist. Try searching for a user below:</S.NotFoundText>
            
            <S.SearchBarWrapper>
                <SearchBar onSuggestionsVisibilityChange={setSuggestionsVisible} />
            </S.SearchBarWrapper>

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
        </S.NotFoundContainer>
    );
};

export default NotFoundPage;
