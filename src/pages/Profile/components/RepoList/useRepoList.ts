import { useEffect, useState } from "react";
import { userRepos } from "@api/github";
import { useAbortController } from "@hooks";
import type { GitHubRepo } from "@app-types/github";

export const useRepoList = (login: string, page: number) => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { getSignal } = useAbortController();

    useEffect(() => {
        const fetchRepos = async () => {
            const signal = getSignal();
            try {
                setIsFetching(true);
                const data = await userRepos(login, page, 10, signal);
                setRepos(data);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching repositories:", error);
                    setRepos([]);
                }
            } finally {
                if (!signal.aborted) {
                    setIsFetching(false);
                }
            }
        };

        if (login) {
            fetchRepos();
        }
    }, [login, page, getSignal]);

    return {
        repos,
        isFetching,
    };
};
