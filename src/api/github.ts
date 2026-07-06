import api from "./client";
import { GITHUB_ENDPOINTS } from "../constants/endpoints";
import type { 
    GitHubUserSuggestion, 
    GitHubUserProfile, 
    GitHubRepo, 
    GitHubGist, 
    GitHubFollowerUser 
} from "../types/github";

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

export const userFollowers = async (
    username: string,
    signal?: AbortSignal,
): Promise<GitHubFollowerUser[]> => {
    const response = await api.get(GITHUB_ENDPOINTS.userFollowers(username), {
        params: { per_page: 100 },
        signal,
    });

    if (response.status !== 200 || !Array.isArray(response.data)) {
        return [];
    }

    return response.data as GitHubFollowerUser[];
};

export const userFollowing = async (
    username: string,
    signal?: AbortSignal,
): Promise<GitHubFollowerUser[]> => {
    const response = await api.get(GITHUB_ENDPOINTS.userFollowing(username), {
        params: { per_page: 100 },
        signal,
    });

    if (response.status !== 200 || !Array.isArray(response.data)) {
        return [];
    }

    return response.data as GitHubFollowerUser[];
};

export const userRepos = async (
    username: string,
    signal?: AbortSignal,
): Promise<GitHubRepo[]> => {
    const response = await api.get(GITHUB_ENDPOINTS.userRepos(username), {
        params: { per_page: 100 },
        signal,
    });

    if (response.status !== 200 || !Array.isArray(response.data)) {
        return [];
    }

    return response.data as GitHubRepo[];
};

export const userGists = async (
    username: string,
    signal?: AbortSignal,
): Promise<GitHubGist[]> => {
    const response = await api.get(GITHUB_ENDPOINTS.userGists(username), {
        params: { per_page: 100 },
        signal,
    });

    if (response.status !== 200 || !Array.isArray(response.data)) {
        return [];
    }

    return response.data as GitHubGist[];
};
