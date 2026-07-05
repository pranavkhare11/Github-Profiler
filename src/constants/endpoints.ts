export const GITHUB_ENDPOINTS = {
    searchUsers: (query: string) => `/search/users?q=${encodeURIComponent(query)}`,
    userProfile: (username: string) => `/users/${encodeURIComponent(username)}`,
    userFollowers: (username: string) => `/users/${encodeURIComponent(username)}/followers`,
    userFollowing: (username: string) => `/users/${encodeURIComponent(username)}/following`,
    userRepos: (username: string) => `/users/${encodeURIComponent(username)}/repos`,
    userGists: (username: string) => `/users/${encodeURIComponent(username)}/gists`,
};
