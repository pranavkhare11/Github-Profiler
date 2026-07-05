import { type CSSProperties } from "react";
import { useSearchBar } from "./useSearchBar";
import "./SearchBar.css";

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
}: SearchBarProps) => {
    const {
        user,
        isLoading,
        suggestions,
        isOpen,
        containerRef,
        hasMinimumInput,
        handleInputChange,
        handleSearch,
        selectSuggestion,
        setIsOpen,
    } = useSearchBar();

    return (
        <div
            ref={containerRef}
            className={`searchbar ${variant === "compact" ? "searchbar--stack" : ""}`.trim()}
            style={containerStyle}
        >
            <input
                type="text"
                placeholder={placeholder}
                className="searchbar-control"
                style={inputStyle}
                value={user}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                autoComplete="chrome-off-random-string"
            />
            <button className="searchbar-button" style={buttonStyle} onClick={handleSearch}>Search</button>

            {isOpen && hasMinimumInput && (
                <div className="searchbar-results" style={resultsStyle}>
                    {isLoading ? (
                        <div className="searchbar-helper">Loading...</div>
                    ) : suggestions.length > 0 ? (
                        <ul className="searchbar-list" style={suggestionListStyle}>
                            {suggestions.map((suggestion) => (
                                <li key={suggestion.id}>
                                    <button
                                        type="button"
                                        className="searchbar-item"
                                        style={suggestionItemStyle}
                                        onClick={() => selectSuggestion(suggestion.login)}
                                    >
                                        <img
                                            src={suggestion.avatar_url}
                                            alt={`${suggestion.login} avatar`}
                                            className="searchbar-avatar"
                                            style={avatarStyle}
                                        />
                                        <span>{suggestion.login}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="searchbar-helper" style={suggestionItemStyle}>No suggestions found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
