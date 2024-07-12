import React, { useRef, useState } from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import { EyeIcon, EditIcon, DeleteIcon } from "nui-react-icons";
import { useNavigate, useRevalidator } from "react-router-dom";
import type { Generic, TableProps } from "@/types";
import Table from "@/components/table";
import NextModal from "@/components/modal";
import { TagForm } from "./tagForm";
import { Confirm } from "@/components/core/confirm";
import useNotifications from "@/store/notifications";
import tagService from "@/services/tag.service";
import { useTable } from "@/hooks/useTable";

interface ChildComponentHandles {
    onOpen: () => void;
    onClose: () => void;
}

export default function TableData({ rows = [], pagination, query }: { rows: TableProps["rows"]; pagination: any; query: string }) {
    const revalidator = useRevalidator();
    const modalRef = useRef<ChildComponentHandles>(null);
    const deleteModalRef = useRef<ChildComponentHandles>(null);
    const { current, mode, onAdd, onEdit, onDelete, onModalClose, updateQueryParams } = useTable();
    // const [current, setCurrent] = useState<Generic>({ is_active: true });
    // const [mode, setMode] = useState<"create" | "update">("create");
    const [isExporting, setIExporting] = useState<boolean>(false);
    const [, notify] = useNotifications();

    const navigate = useNavigate();
    // const location = useLocation();

    const columns = [
        { name: "NAME", uid: "name", sortable: true },
        { name: "STATUS", uid: "status", sortable: true },
        { name: "CREATED_AT", uid: "create" },
        { name: "UPDATED_AT", uid: "update" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const onSearchChange = (value: string) => {
        updateQueryParams("name", value);
    };

    const handleEdit = (value: Generic) => {
        onEdit(modalRef, value)
    };

    const addNew = () => {
        onAdd(modalRef)
    };

    const handleModalClose = () => {
        onModalClose(modalRef)
    };

    const handleDelete = (value: Generic) => {
        onDelete(deleteModalRef, value)
    };

    const onCloseDelete = () => {
        onModalClose(deleteModalRef)
    };

    const onConfirmDelete = async () => {
        if (!current.id) {
            return;
        }
        try {
            await tagService.delete(current.id);
            revalidator.revalidate();
            notify.success("Tag deleted successfully");
            onCloseDelete();
        } catch (error) {
            notify.error(`An error deleting tag: ${error}`);
        }
    };
    const onExport = async () => {
        setIExporting(true);
        try {
            await tagService.export();
            notify.success("Data exported successfully, check your email.");
        } catch (error) {
            notify.error(`An error occurred error exporting tag data: ${error}`);
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
                                <EyeIcon onClick={() => navigate(`/admin/tag/${row.id}`)} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit tag">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon onClick={() => handleEdit(row)} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete tag">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDelete(row)} />
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
                onAddNew={addNew}
                callbackFunction={rowRender}
                onSearchChange={onSearchChange}
                columns={columns}
                rows={rows}
                pagination={pagination}
                query={query}
                canExport
                onExport={onExport}
                isExporting={isExporting}
            />
            <NextModal ref={modalRef} size="lg">
                <TagForm current={current} onClose={handleModalClose} type={mode} />
            </NextModal>
            <NextModal ref={deleteModalRef} size="md">
                <Confirm onClose={onCloseDelete} onConfirm={onConfirmDelete} />
            </NextModal>
        </React.Fragment>
    );
}
