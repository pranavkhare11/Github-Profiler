import { useEffect, useState } from "react";
import api from "@api/client";
import { GITHUB_ENDPOINTS } from "@constants/endpoints";
import { useAbortController } from "@hooks";
import type { GitHubGist } from "@app-types/github";

export const useGistList = (login: string) => {
    const [gists, setGists] = useState<GitHubGist[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { getSignal } = useAbortController();

    useEffect(() => {
        const fetchGists = async () => {
            const signal = getSignal();
            try {
                setIsFetching(true);
                const response = await api.get(GITHUB_ENDPOINTS.userGists(login), {
                    params: { per_page: 100 },
                    signal,
                });
                setGists(response.data);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching gists:", error);
                    setGists([]);
                }
            } finally {
                if (!signal.aborted) {
                    setIsFetching(false);
                }
            }
        };

        if (login) {
            fetchGists();
        }
    }, [login, getSignal]);

    return {
        gists,
        isFetching,
    };
};
