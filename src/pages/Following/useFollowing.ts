import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "@api/client";
import { GITHUB_ENDPOINTS } from "@constants/endpoints";
import { useAbortController } from "@hooks";
import type { GitHubFollowerUser } from "@app-types/github";

export const useFollowing = () => {
    const { username } = useParams<{ username: string }>();
    const [following, setFollowing] = useState<GitHubFollowerUser[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { getSignal } = useAbortController();

    useEffect(() => {
        const fetchFollowing = async () => {
            if (!username) return;
            const signal = getSignal();
            try {
                setIsFetching(true);
                const response = await api.get(GITHUB_ENDPOINTS.userFollowing(username), {
                    params: { per_page: 100 },
                    signal,
                });
                setFollowing(response.data);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching following list:", error);
                    setFollowing([]);
                }
            } finally {
                if (!signal.aborted) {
                    setIsFetching(false);
                }
            }
        };

        fetchFollowing();
    }, [username, getSignal]);

    return {
        username: username || "",
        following,
        isFetching,
    };
};
