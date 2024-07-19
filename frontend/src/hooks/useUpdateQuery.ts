import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { debounce } from "@/utils/util";

interface QueryParam {
    key: string;
    value: string;
}

const useUpdateQuery = (delay = 500) => {
    const navigate = useNavigate();
    const location = useLocation();

    const updateQuery = useCallback(
        debounce((data: QueryParam[]) => {
            const searchParams = new URLSearchParams(location.search);
            data.forEach(({ key, value }) => {
                searchParams.set(key, value);
            });
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        }, delay),
        [navigate, location.search, location.pathname]
    );

    return { updateQuery };
};

export { useUpdateQuery };
