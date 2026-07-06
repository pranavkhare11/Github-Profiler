import { useEffect, useState } from "react";
import { userGists } from "@api/github";
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
                const data = await userGists(login, signal);
                setGists(data);
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
