import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userFollowing } from "@api/github";
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
                const data = await userFollowing(username, signal);
                setFollowing(data);
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
