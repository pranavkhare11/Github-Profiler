import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userFollowers, userProfile } from "@api/github";
import { useAbortController } from "@hooks";
import type { GitHubFollowerUser } from "@app-types/github";

export const useFollowers = (page: number, initialTotalCount?: number) => {
    const { username } = useParams<{ username: string }>();
    const [followers, setFollowers] = useState<GitHubFollowerUser[]>([]);
    const [totalCount, setTotalCount] = useState<number>(initialTotalCount ?? 0);
    const [isFetching, setIsFetching] = useState(false);
    const { getSignal } = useAbortController();

    useEffect(() => {
        if (initialTotalCount !== undefined) {
            setTotalCount(initialTotalCount);
        }
    }, [initialTotalCount]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!username || initialTotalCount !== undefined) return;
            const signal = getSignal();
            try {
                const profileData = await userProfile(username, signal);
                setTotalCount(profileData.followers);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching profile for followers count:", error);
                }
            }
        };

        fetchProfile();
    }, [username, initialTotalCount, getSignal]);

    useEffect(() => {
        const fetchFollowersList = async () => {
            if (!username) return;
            const signal = getSignal();
            try {
                setIsFetching(true);
                const data = await userFollowers(username, page, 12, signal);
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

        fetchFollowersList();
    }, [username, page, getSignal]);

    return {
        username: username || "",
        followers,
        totalCount,
        isFetching,
    };
};
