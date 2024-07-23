import React, { useRef, useState } from "react";
import { Avatar, Badge, Chip, Tooltip } from "@nextui-org/react";
import { EyeIcon, EditIcon, DeleteIcon } from "nui-react-icons";
import { useNavigate, useRevalidator } from "react-router-dom";
import type { TableProps } from "@/types";
import Table from "@/components/table";
import NextModal from "@/components/modal";
import { ProductForm } from "./productsForm";
import { Confirm } from "@/components/core/confirm";
import useNotifications from "@/store/notifications";
import productService from "@/services/product.service";
import { useTable } from "@/hooks/useTable";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks/use-query-params";
import { currency, imgSrc } from "@/utils/util";
import { Base } from "@/models/user";
import { SlideOver } from "@/components/core/slideOver";
import { useOverlayTriggerState } from "@react-stately/overlays";

interface ChildComponentHandles {
    onOpen: () => void;
    onClose: () => void;
}

export default function TableData({
    rows = [],
    pagination,
    query,
    tags = [],
    collections = [],
}: {
    rows: TableProps["rows"];
    pagination: any;
    query: string;
    tags: any[];
    collections: any[];
}) {
    const state = useOverlayTriggerState({});
    const revalidator = useRevalidator();
    const queryClient = useQueryClient();
    const { name = "", page = "" } = useQueryParams();
    const deleteModalRef = useRef<ChildComponentHandles>(null);
    const { current, mode, onEdit, onDelete, onModalClose, updateQueryParams } = useTable();
    const [isExporting, setIExporting] = useState<boolean>(false);
    const [, notify] = useNotifications();

    const navigate = useNavigate();

    const columns = [
        { name: "Image", uid: "image" },
        { name: "Name", uid: "name", sortable: true },
        { name: "Description", uid: "desc" },
        { name: "Price", uid: "price" },
        { name: "Old Price", uid: "old_price" },
        { name: "Created_at", uid: "create" },
        { name: "Actions", uid: "actions" },
    ];

    const handleEdit = (row: any) => {
        onEdit(null, row);
        state.open();
    };

    const onConfirmDelete = async () => {
        if (!current.id) {
            return;
        }
        try {
            await productService.delete(current.id);
            queryClient.removeQueries({ queryKey: ["products", { name, page }] });
            revalidator.revalidate();
            notify.success("products deleted successfully");
            onModalClose(deleteModalRef);
        } catch (error) {
            notify.error(`An error deleting products: ${error}`);
        }
    };
    const onExport = async () => {
        setIExporting(true);
        try {
            await productService.export();
            notify.success("Data exported successfully, check your email.");
        } catch (error) {
            notify.error(`An error occurred error exporting products data: ${error}`);
        } finally {
            setIExporting(false);
        }
    };

    const handleSlideOverClose = () => {
        onModalClose(null)
        state.close();
    };

    const rowRender = React.useCallback((row: Record<string, any>, columnKey: string | number) => {
        const cellValue = row[columnKey];

        switch (columnKey) {
            case "image":
                return (
                    <Badge content="" color={row.is_active ? "success" : "danger"} shape="circle" placement="bottom-right">
                        <Avatar radius="md" src={imgSrc(`products%2F${row.image ?? ""}`)} />
                    </Badge>
                );
            case "name":
                return <div className="font-bold truncate max-w-32">{row?.name}</div>;
            case "desc":
                return <div className="font-bold truncate max-w-32">{row?.description}</div>;
            case "price":
                return <p>{currency(Number(row?.price) ?? 0)}</p>;
            case "old_price":
                return <p>{currency(Number(row?.old_price) ?? 0)}</p>;
            case "tags":
                return (
                    <div className="flex flex-wrap gap-1">
                        {row?.tags?.map((tag: Base, index: number) => (
                            <Chip key={index} color="secondary" variant="bordered">
                                {tag.name}
                            </Chip>
                        ))}
                    </div>
                );
            case "collections":
                return (
                    <div className="flex flex-wrap gap-1">
                        {row?.collections?.map((collection: Base, index: number) => (
                            <Chip key={index} color="warning" variant="bordered">
                                {collection.name}
                            </Chip>
                        ))}
                    </div>
                );
            case "create":
                return <time dateTime={row.created_at}>{row.created_at}</time>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => navigate(`/admin/products/${row.id}`)} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit products">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon onClick={() => handleEdit(row)} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete products">
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
                onAddNew={state.open}
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
            <SlideOver
                isOpen={state.isOpen}
                onClose={handleSlideOverClose}
                className="bg-default-50"
                title={`${mode == "create" ? "Add" : "Edit"} Products`}
                // footer={
                //     <div className="flex gap-2 justify-end p-2">
                //         <Button onPress={state.close} color="danger" className="min-w-32">
                //             Cancel
                //         </Button>
                //         <Button variant="shadow" color="primary" className="min-w-32" onPress={() => formRef?.current?.submit()}>
                //             Submit
                //         </Button>
                //     </div>
                // }
            >
                {state.isOpen && <ProductForm current={current} onClose={handleSlideOverClose} type={mode} tags={tags} collections={collections} />}
            </SlideOver>
            <NextModal ref={deleteModalRef} size="md">
                <Confirm onClose={() => onModalClose(deleteModalRef)} onConfirm={onConfirmDelete} />
            </NextModal>
        </React.Fragment>
    );
}
