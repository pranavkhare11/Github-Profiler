import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import api from "@api/client";
import { GITHUB_ENDPOINTS } from "@constants/endpoints";
import { useDebounce, useAbortController } from "@hooks";
import type { GitHubUserSuggestion } from "@app-types/github";

export const useSearchBar = () => {
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
    const { getSignal } = useAbortController();

    useEffect(() => {
        const trimmedQuery = debouncedUser.trim();

        if (trimmedQuery.length < 3) {
            setSuggestions([]);
            setIsLoading(false);
            return;
        }

        const signal = getSignal();
        setIsLoading(true);

        const loadSuggestions = async () => {
            try {
                const response = await api.get(GITHUB_ENDPOINTS.searchUsers(trimmedQuery), {
                    signal,
                });
                const data = response.data?.items || [];
                setSuggestions(data);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching user suggestions:", error);
                    setSuggestions([]);
                }
            } finally {
                if (!signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadSuggestions();
    }, [debouncedUser, getSignal]);

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

    const selectSuggestion = (login: string) => {
        setUser(login);
        setIsOpen(false);
        setSuggestions([]);
        navigate(`/profile/${encodeURIComponent(login)}`);
    };

    return {
        user,
        setUser,
        isLoading,
        suggestions,
        isOpen,
        setIsOpen,
        setSuggestions,
        containerRef,
        hasMinimumInput,
        handleInputChange,
        handleSearch,
        selectSuggestion,
    };
};
