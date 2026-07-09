import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

function usePagination<T>(
    items: T[],
    itemsPerPage = 10,
    totalItems = 0,
    dependency?: any,
    pathPrefix?: string
) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) || 1 : 1;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const validPage = totalPages > 0 ? Math.min(Math.max(currentPage, 1), totalPages) : 1;

    const setCurrentPage = (pageOrFn: number | ((prev: number) => number)) => {
        const nextPage = typeof pageOrFn === "function" ? pageOrFn(validPage) : pageOrFn;
        const nextParams = new URLSearchParams(searchParams);
        let targetPath = pathPrefix;

        if (nextPage <= 1) {
            nextParams.delete("page");
            if (pathPrefix && pathPrefix.endsWith("/repos")) {
                targetPath = pathPrefix.slice(0, -6); // Strip "/repos"
            }
        } else {
            nextParams.set("page", String(nextPage));
        }

        if (targetPath) {
            const queryStr = nextParams.toString();
            navigate(queryStr ? `${targetPath}?${queryStr}` : targetPath);
        } else {
            setSearchParams(nextParams);
        }
    };

    useEffect(() => {
        if (searchParams.has("page")) {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.delete("page");
            setSearchParams(nextParams, { replace: true });
        }
    }, [dependency]);

    return {
        currentPage: validPage,
        setCurrentPage,
        totalPages,
        displayedItems: items,
    };
}

export default usePagination;
