import { useState, useEffect } from "react";

function usePagination<T>(items: T[], itemsPerPage = 10, dependency?: any) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [dependency]);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const displayedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        displayedItems,
    };
}

export default usePagination;
