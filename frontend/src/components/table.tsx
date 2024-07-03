"use client";

import React from "react";
import {
    Table as NextTable,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    SortDescriptor,
} from "@nextui-org/react";
import { PlusIcon, SearchIcon, ChevronDownIcon } from "nui-react-icons";
import { Column, TableProps } from "@/types";
import { useNavigate, useLocation } from "react-router-dom";

export default function Table({
    rows = [],
    columns = [],
    callbackFunction,
    onSearchChange,
    onAddNew,
    onExport,
    pagination,
    query,
    canExport = false,
    isExporting = false,
}: TableProps) {
    type Model = (typeof rows)[0];

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set([...columns.map((column) => column.uid.toString())]));
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const page = pagination?.page ?? 1;

    const headerColumns = React.useMemo(() => {
        return columns.filter((column: Column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns, columns]);

    const sortedItems = React.useMemo(() => {
        return [...rows].sort((a: Model, b: Model) => {
            const first = a[sortDescriptor.column as keyof Model] as number;
            const second = b[sortDescriptor.column as keyof Model] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, rows]);

    const renderCell = React.useCallback(callbackFunction, [callbackFunction]);

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

    const onClear = React.useCallback(() => {
        onSearchChange("");
    }, [onSearchChange]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by name..."
                        startContent={<SearchIcon className="text-default-300" />}
                        value={query}
                        variant="bordered"
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button onPress={onAddNew} color="primary" endContent={<PlusIcon />}>
                            Add New
                        </Button>
                        {canExport && (
                            <Button isLoading={isExporting} isDisabled={isExporting} onPress={onExport} color="secondary" className="min-w-28">
                                Export
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {pagination?.total_count} entries</span>
                </div>
            </div>
        );
    }, [visibleColumns, onSearchChange, columns, query, onClear, pagination?.total_count]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all" ? "All items selected" : `${selectedKeys.size} of ${rows.length} selected`}
                </span>
                <Pagination
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
                    <Button
                        isDisabled={pagination?.total_pages === 1 || page == pagination?.total_pages}
                        size="sm"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, page, rows.length, pagination?.total_pages, onPageChange, onNextPage, onPreviousPage]);

    return (
        <NextTable
            isStriped
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={{
                wrapper: "max-h-[700px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No records found"} items={sortedItems}>
                {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
            </TableBody>
        </NextTable>
    );
}
