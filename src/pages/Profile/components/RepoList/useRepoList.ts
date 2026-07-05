import { useEffect, useState } from "react";
import api from "@api/client";
import { GITHUB_ENDPOINTS } from "@constants/endpoints";
import { useAbortController } from "@hooks";
import type { GitHubRepo } from "@app-types/github";

export const useRepoList = (login: string) => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { getSignal } = useAbortController();

    useEffect(() => {
        const fetchRepos = async () => {
            const signal = getSignal();
            try {
                setIsFetching(true);
                const response = await api.get(GITHUB_ENDPOINTS.userRepos(login), {
                    params: { per_page: 100 },
                    signal,
                });
                setRepos(response.data);
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
    }, [login, getSignal]);

    return {
        repos,
        isFetching,
    };
};
