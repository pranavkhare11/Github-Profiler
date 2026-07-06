import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { userProfile } from "@api/github";
import { useAbortController, addRecentSearch } from "@hooks";
import type { GitHubUserProfile } from "@app-types/github";

interface UseProfileCardParams {
    login: string;
    onProfileLoaded: (profile: GitHubUserProfile | null) => void;
    onFetching: (isFetching: boolean) => void;
}

export const useProfileCard = ({ login, onProfileLoaded, onFetching }: UseProfileCardParams) => {
    const navigate = useNavigate();
    const [userprofile, setUserprofile] = useState<GitHubUserProfile | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const { getSignal } = useAbortController();

    useEffect(() => {
        const loadUserProfile = async () => {
            const signal = getSignal();
            try {
                setIsFetching(true);
                onFetching(true);
                setUserprofile(null);
                onProfileLoaded(null);

                const startTime = Date.now();
                const data = await userProfile(login, signal);

                const elapsed = Date.now() - startTime;
                const minDelay = 1200;
                if (elapsed < minDelay) {
                    await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
                }

                if (!signal.aborted) {
                    setUserprofile(data);
                    onProfileLoaded(data);
                    addRecentSearch({
                        login: data.login,
                        avatar_url: data.avatar_url,
                        html_url: `https://github.com/${data.login}`,
                    });
                }
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching user profile:", error);
                    if (!signal.aborted) {
                        setUserprofile(null);
                        onProfileLoaded(null);
                    }
                }
            } finally {
                if (!signal.aborted) {
                    setIsFetching(false);
                    onFetching(false);
                }
            }
        };

        if (login) {
            loadUserProfile();
        } else {
            setUserprofile(null);
            onProfileLoaded(null);
        }
    }, [login, onFetching, onProfileLoaded, getSignal]);

    return {
        userprofile,
        isFetching,
        navigate,
    };
};
