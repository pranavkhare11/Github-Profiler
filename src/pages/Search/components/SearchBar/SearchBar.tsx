import { type CSSProperties, useEffect } from "react";
import { useSearchBar } from "./useSearchBar";
import * as S from "./SearchBar.styles";

interface SearchBarProps {
    placeholder?: string;
    variant?: "default" | "compact";
    containerStyle?: CSSProperties;
    inputStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
    resultsStyle?: CSSProperties;
    suggestionListStyle?: CSSProperties;
    suggestionItemStyle?: CSSProperties;
    avatarStyle?: CSSProperties;
    onSuggestionsVisibilityChange?: (visible: boolean) => void;
}

const SearchBar = ({
    placeholder = "Search GitHub users...",
    variant = "default",
    containerStyle,
    inputStyle,
    buttonStyle,
    resultsStyle,
    suggestionListStyle,
    suggestionItemStyle,
    avatarStyle,
    onSuggestionsVisibilityChange,
}: SearchBarProps) => {
    const {
        user,
        isSearching,
        suggestions,
        isOpen,
        containerRef,
        hasMinimumInput,
        handleInputChange,
        handleSearch,
        selectSuggestion,
        setIsOpen,
        username,
    } = useSearchBar();

    const suggestionsVisible = isOpen && hasMinimumInput && (isSearching || suggestions.length > 0);

    useEffect(() => {
        onSuggestionsVisibilityChange?.(suggestionsVisible);
    }, [suggestionsVisible, onSuggestionsVisibilityChange]);

    return (
        <S.SearchBarContainer
            ref={containerRef}
            $stacked={variant === "compact"}
            style={containerStyle}
        >
            <S.SearchBarControl
                type="text"
                placeholder={placeholder}
                style={inputStyle}
                value={user}
                onChange={handleInputChange}
                onFocus={() => {
                    if (!username || user.trim().toLowerCase() !== username.trim().toLowerCase()) {
                        setIsOpen(true);
                    }
                }}
                autoComplete="chrome-off-random-string"
            />
            <S.SearchBarButton style={buttonStyle} onClick={handleSearch}>
                Search
            </S.SearchBarButton>

            {isOpen && hasMinimumInput && (
                <S.SearchBarResults style={resultsStyle}>
                    {isSearching ? (
                        <S.SearchBarHelper>Loading...</S.SearchBarHelper>
                    ) : suggestions.length > 0 ? (
                        <S.SearchBarList style={suggestionListStyle}>
                            {suggestions.map((suggestion) => (
                                <li key={suggestion.id}>
                                    <S.SearchBarItem
                                        type="button"
                                        style={suggestionItemStyle}
                                        onClick={() => selectSuggestion(suggestion.login)}
                                    >
                                        <S.SearchBarAvatar
                                            src={suggestion.avatar_url}
                                            alt={`${suggestion.login} avatar`}
                                            style={avatarStyle}
                                        />
                                        <span>{suggestion.login}</span>
                                    </S.SearchBarItem>
                                </li>
                            ))}
                        </S.SearchBarList>
                    ) : (
                        <S.SearchBarHelper style={suggestionItemStyle}>
                            No suggestions found.
                        </S.SearchBarHelper>
                    )}
                </S.SearchBarResults>
            )}
        </S.SearchBarContainer>
    );
};

export default SearchBar;
