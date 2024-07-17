import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Generic } from "@/types";

const useTable = () => {
    const [current, setCurrent] = useState<Generic>({ is_active: true });
    const [mode, setMode] = useState<"create" | "update">("create");

    const navigate = useNavigate();
    const location = useLocation();

    const updateQueryParams = React.useCallback(
        (key: string, value: string) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set(key, value);
            searchParams.set("page", "1");
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        },
        [navigate, location.search]
    );

    const onAdd = (modalRef: any) => {
        setMode("create");
        if (modalRef.current) {
            modalRef.current.onOpen();
        }
    };

    const onEdit = (modalRef: any, value: Generic) => {
        setMode("update");
        setCurrent((prev) => ({ ...prev, ...value }));
        if (modalRef?.current) {
            modalRef.current.onOpen();
        }
    };

    const onDelete = (modalRef: any, value: Generic) => {
        setCurrent((prev) => ({ ...prev, ...value }));
        if (modalRef.current) {
            modalRef.current.onOpen();
        }
    };

    const onModalClose = (modalRef: any) => {
        setMode("create");
        setCurrent({ is_active: true } as Generic);
        if (modalRef?.current) {
            modalRef.current.onClose();
        }
    };

    return {
        current,
        mode,
        onAdd,
        onEdit,
        onDelete,
        onModalClose,
        updateQueryParams
    };
};

export { useTable };
