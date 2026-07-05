import { useEffect, useState, useRef, type ChangeEvent, type CSSProperties } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { searchUsers } from "../../api/github";
import useDebounce from "../../hooks/useDebounce";
import type { GitHubUserSuggestion } from "../../types/github";

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
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = useParams<{ username?: string }>();
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<GitHubUserSuggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const debouncedUser = useDebounce(user, 1000);
    const hasMinimumInput = user.trim().length >= 3;

    useEffect(() => {
        const trimmedQuery = debouncedUser.trim();

        if (trimmedQuery.length < 3) {
            setSuggestions([]);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();
        setIsLoading(true);

        const loadSuggestions = async () => {
            try {
                const data = await searchUsers(trimmedQuery, controller.signal);
                setSuggestions(data);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching user suggestions:", error);
                    setSuggestions([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadSuggestions();

        return () => {
            controller.abort();
        };
    }, [debouncedUser]);

    const isMainPage = location.pathname === "/" || location.pathname === "/home";

    useEffect(() => {
        if (isMainPage) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMainPage]);

    useEffect(() => {
        setSuggestions([]);
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (username) {
            setUser(username);
        } else {
            setUser("");
        }
    }, [username]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextValue = e.target.value;
        setUser(nextValue);
        setIsOpen(true);

        if (nextValue.trim().length < 3) {
            setSuggestions([]);
            setIsLoading(false);
            return;
        }
    };

    const handleSearch = () => {
        const trimmedUser = user.trim();

        if (trimmedUser.length < 3) {
            return;
        }

        setSuggestions([]);
        navigate(`/profile/${encodeURIComponent(trimmedUser)}`);
    };

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
                                        onClick={() => {
                                            setUser(suggestion.login);
                                            setIsOpen(false);
                                            setSuggestions([]);
                                            navigate(`/profile/${encodeURIComponent(suggestion.login)}`);
                                        }}
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
