import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "@api/client";
import { GITHUB_ENDPOINTS } from "@constants/endpoints";
import { useAbortController } from "@hooks";
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
                const response = await api.get(GITHUB_ENDPOINTS.userProfile(login), { signal });
                const data = response.data as GitHubUserProfile;

                const elapsed = Date.now() - startTime;
                const minDelay = 1200;
                if (elapsed < minDelay) {
                    await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
                }

                if (!signal.aborted) {
                    setUserprofile(data);
                    onProfileLoaded(data);
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
