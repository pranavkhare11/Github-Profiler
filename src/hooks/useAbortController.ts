import { useEffect, useRef, useCallback } from "react";

const useAbortController = () => {
    const controllerRef = useRef<AbortController | null>(null);

    const getSignal = useCallback(() => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        const newController = new AbortController();
        controllerRef.current = newController;
        return newController.signal;
    }, []);

    const abort = useCallback(() => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, []);

    return { getSignal, abort };
};

export default useAbortController;
