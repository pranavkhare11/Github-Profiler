import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userFollowers } from "@api/github";
import { useAbortController } from "@hooks";
import type { GitHubFollowerUser } from "@app-types/github";

export const useFollowers = () => {
    const { username } = useParams<{ username: string }>();
    const [followers, setFollowers] = useState<GitHubFollowerUser[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { getSignal } = useAbortController();

    useEffect(() => {
        const fetchFollowers = async () => {
            if (!username) return;
            const signal = getSignal();
            try {
                setIsFetching(true);
                const data = await userFollowers(username, signal);
                setFollowers(data);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching followers:", error);
                    setFollowers([]);
                }
            } finally {
                if (!signal.aborted) {
                    setIsFetching(false);
                }
            }
        };

        fetchFollowers();
    }, [username, getSignal]);

    return {
        username: username || "",
        followers,
        isFetching,
    };
};
