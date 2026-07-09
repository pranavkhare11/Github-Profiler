import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userFollowing, userProfile } from "@api/github";
import { useAbortController } from "@hooks";
import type { GitHubFollowerUser } from "@app-types/github";

export const useFollowing = (page: number, initialTotalCount?: number) => {
    const { username } = useParams<{ username: string }>();
    const [following, setFollowing] = useState<GitHubFollowerUser[]>([]);
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
                setTotalCount(profileData.following);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching profile for following count:", error);
                }
            }
        };

        fetchProfile();
    }, [username, initialTotalCount, getSignal]);

    useEffect(() => {
        const fetchFollowingList = async () => {
            if (!username) return;
            const signal = getSignal();
            try {
                setIsFetching(true);
                const data = await userFollowing(username, page, 12, signal);
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

        fetchFollowingList();
    }, [username, page, getSignal]);

    return {
        username: username || "",
        following,
        totalCount,
        isFetching,
    };
};
