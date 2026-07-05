import api from "./client";
import { GITHUB_ENDPOINTS } from "../constants/endpoints";
import type { GitHubUserSuggestion, GitHubUserProfile } from "../types/github";

export const searchUsers = async (
    query: string,
    signal?: AbortSignal,
): Promise<GitHubUserSuggestion[]> => {
    const response = await api.get(GITHUB_ENDPOINTS.searchUsers(query), {
        signal,
    });

    if (response.status !== 200 || !Array.isArray(response.data?.items)) {
        return [];
    }

    return response.data.items as GitHubUserSuggestion[];
};

export const userProfile = async (
    username: string,
    signal?: AbortSignal,
): Promise<GitHubUserProfile> => {
    const response = await api.get(GITHUB_ENDPOINTS.userProfile(username), {
        signal,
    });

    if (response.status !== 200) {
        throw new Error("Failed to fetch user profile");
    }

    return response.data as GitHubUserProfile;
};