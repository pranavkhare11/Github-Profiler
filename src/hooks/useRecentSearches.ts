import { useState, useEffect } from "react";

export interface RecentSearchItem {
  login: string;
  avatar_url: string;
  html_url: string;
}

const RECENT_SEARCHES_KEY = "github_profiler_recent_searches_v2";
const MAX_RECENT_SEARCHES = 4; // Render 4 cards cleanly on grid

export const getRecentSearches = (): RecentSearchItem[] => {
  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => {
      if (typeof item === "string") {
        return {
          login: item,
          avatar_url: `https://github.com/${item}.png`,
          html_url: `https://github.com/${item}`,
        };
      }
      return item;
    });
  } catch (error) {
    console.error("Error reading recent searches:", error);
    return [];
  }
};

export const addRecentSearch = (item: RecentSearchItem) => {
  if (!item || !item.login) return;
  const loginLower = item.login.toLowerCase();
  try {
    const current = getRecentSearches();
    const updated = [item, ...current.filter((existing) => existing.login.toLowerCase() !== loginLower)];
    const limited = updated.slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limited));
    window.dispatchEvent(new Event("recentSearchesUpdated"));
  } catch (error) {
    console.error("Error adding recent search:", error);
  }
};

export const clearRecentSearches = () => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    window.dispatchEvent(new Event("recentSearchesUpdated"));
  } catch (error) {
    console.error("Error clearing recent searches:", error);
  }
};

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());

    const handleUpdate = () => {
      setRecentSearches(getRecentSearches());
    };

    window.addEventListener("recentSearchesUpdated", handleUpdate);
    return () => {
      window.removeEventListener("recentSearchesUpdated", handleUpdate);
    };
  }, []);

  return {
    recentSearches,
    addSearch: addRecentSearch,
    clearSearches: clearRecentSearches,
  };
};
