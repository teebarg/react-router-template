import React, { useRef, useState } from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import { EyeIcon, EditIcon, DeleteIcon } from "nui-react-icons";
import { useNavigate, useRevalidator } from "react-router-dom";
import type { TableProps } from "@/types";
import Table from "@/components/table";
import NextModal from "@/components/modal";
import { CollectionsForm } from "./CollectionsForm";
import { Confirm } from "@/components/core/confirm";
import useNotifications from "@/store/notifications";
import collectionsService from "@/services/collections.service";
import { useTable } from "@/hooks/useTable";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks/use-query-params";

interface ChildComponentHandles {
    onOpen: () => void;
    onClose: () => void;
}

export default function TableData({ rows = [], pagination, query }: { rows: TableProps["rows"]; pagination: any; query: string }) {
    const revalidator = useRevalidator();
    const queryClient = useQueryClient();
    const { name = "", page = "" } = useQueryParams();
    const modalRef = useRef<ChildComponentHandles>(null);
    const deleteModalRef = useRef<ChildComponentHandles>(null);
    const { current, mode, onAdd, onEdit, onDelete, onModalClose, updateQueryParams } = useTable();
    const [isExporting, setIExporting] = useState<boolean>(false);
    const [, notify] = useNotifications();

    const navigate = useNavigate();

    const columns = [
        { name: "Name", uid: "name", sortable: true },
        { name: "Status", uid: "status", sortable: true },
        { name: "Created_at", uid: "create" },
        { name: "Updated_at", uid: "update" },
        { name: "Actions", uid: "actions" },
    ];

    const onConfirmDelete = async () => {
        if (!current.id) {
            return;
        }
        try {
            await collectionsService.delete(current.id);
            queryClient.removeQueries({ queryKey: ["collections", { name, page }] });
            revalidator.revalidate();
            notify.success("Collections deleted successfully");
            onModalClose(deleteModalRef);
        } catch (error) {
            notify.error(`An error deleting Collections: ${error}`);
        }
    };
    const onExport = async () => {
        setIExporting(true);
        try {
            await collectionsService.export();
            notify.success("Data exported successfully, check your email.");
        } catch (error) {
            notify.error(`An error occurred error exporting Collections data: ${error}`);
        } finally {
            setIExporting(false);
        }
    };

    const rowRender = React.useCallback((row: Record<string, string>, columnKey: string | number) => {
        const cellValue = row[columnKey];

        switch (columnKey) {
            case "name":
                return <div className="font-bold">{row?.name}</div>;
            case "status":
                return (
                    <Chip color={row.is_active ? "success" : "danger"} variant="bordered">
                        {row.is_active ? "Active" : "Inactive"}
                    </Chip>
                );
            case "create":
                return <time dateTime={row.created_at}>{row.created_at}</time>;
            case "update":
                return <time dateTime={row.updated_at}>{row.updated_at}</time>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => navigate(`/admin/collections/${row.id}`)} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit Collections">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon onClick={() => onEdit(modalRef, row)} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete Collections">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => onDelete(deleteModalRef, row)} />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <React.Fragment>
            <Table
                onAddNew={() => onAdd(modalRef)}
                callbackFunction={rowRender}
                onSearchChange={(value: string) => updateQueryParams("name", value)}
                columns={columns}
                rows={rows}
                pagination={pagination}
                query={query}
                canExport
                onExport={onExport}
                isExporting={isExporting}
            />
            <NextModal ref={modalRef} size="lg">
                <CollectionsForm current={current} onClose={() => onModalClose(modalRef)} type={mode} />
            </NextModal>
            <NextModal ref={deleteModalRef} size="md">
                <Confirm onClose={() => onModalClose(deleteModalRef)} onConfirm={onConfirmDelete} />
            </NextModal>
        </React.Fragment>
    );
}
