export interface GitHubUserSuggestion {
    id: number;
    login: string;
    avatar_url: string;
}

export interface GitHubUserProfile {
    id: number;
    login: string;
    avatar_url: string;
    name: string;
    bio: string | null;
    location: string | null;
    email: string | null;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

export interface GitHubGistFile {
    filename: string;
    type: string;
    language: string | null;
    raw_url: string;
    size: number;
}

export interface GitHubGist {
    id: string;
    description: string | null;
    html_url: string;
    created_at: string;
    files: Record<string, GitHubGistFile>;
}

export interface GitHubFollowerUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}
