import React from "react";
import { Button, Pagination as Pag } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pagination } from "@/models/pagination";

interface Props {
    pagination: Pagination;
}

const PaginationComponent: React.FC<Props> = ({ pagination }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const page = pagination?.page ?? 1;

    const updateQueryParams = React.useCallback(
        (key: string, value: string) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set(key, value);
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        },
        [navigate, location.search]
    );

    const onNextPage = React.useCallback(() => {
        updateQueryParams("page", `${page + 1}`);
    }, [page]);

    const onPreviousPage = React.useCallback(() => {
        updateQueryParams("page", `${page - 1}`);
    }, [page]);

    const onPageChange = React.useCallback((page: number) => {
        updateQueryParams("page", page.toString());
    }, []);

    return (
        <div className="py-2 px-2 flex justify-between items-center">
            <Pag
                showControls
                classNames={{
                    cursor: "bg-foreground text-background",
                }}
                color="default"
                isDisabled={false}
                page={page}
                total={pagination?.total_pages ?? 1}
                variant="light"
                onChange={onPageChange}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Button isDisabled={pagination?.total_pages === 1 || page == 1} size="sm" variant="flat" onPress={onPreviousPage}>
                    Previous
                </Button>
                <Button isDisabled={pagination?.total_pages === 1 || page == pagination?.total_pages} size="sm" variant="flat" onPress={onNextPage}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export { PaginationComponent };
