"use client";

import React, { useRef, useState } from "react";
import { Chip, Badge, Avatar, Tooltip } from "@nextui-org/react";
import { CheckIcon, EyeIcon, EditIcon, DeleteIcon } from "nui-react-icons";
import { useLocation, useNavigate, useRevalidator } from "react-router-dom";
import type { TableProps, User } from "@/types";
import Table from "@/components/table";
import NextModal from "@/components/modal";
import { UserForm } from "./userForm";
import { Confirm } from "@/components/core/confirm";
import userService from "@/services/user.service";
import useNotifications from "@/store/notifications";

interface ChildComponentHandles {
    onOpen: () => void;
    onClose: () => void;
}

export default function TableData({
    rows = [],
    pagination,
    query,
}: {
    rows: TableProps["rows"];
    pagination: TableProps["pagination"];
    query: string;
}) {
    const revalidator = useRevalidator();
    const modalRef = useRef<ChildComponentHandles>(null);
    const deleteModalRef = useRef<ChildComponentHandles>(null);
    const [currentUser, setCurrent] = useState<User>({ is_active: true });
    const [mode, setMode] = useState<"create" | "update">("create");
    const [isExporting, setIExporting] = useState<boolean>(false);
    const [, notify] = useNotifications();

    const navigate = useNavigate();
    const location = useLocation();

    const columns = [
        { name: "AVATAR", uid: "avatar" },
        { name: "FULLNAME", uid: "name", sortable: true },
        { name: "EMAIL", uid: "email", sortable: true },
        { name: "STATUS", uid: "status", sortable: true },
        { name: "CREATED_AT", uid: "create" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const updateQueryParams = React.useCallback(
        (key: string, value: string) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set(key, value);
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        },
        [navigate, location.search]
    );

    const onSearchChange = (value: string) => {
        updateQueryParams("name", value);
    };

    const handleEdit = (value: User) => {
        setMode("update");
        setCurrent((prev) => ({ ...prev, ...value }));
        if (modalRef.current) {
            modalRef.current.onOpen();
        }
    };

    const addNew = () => {
        setMode("create");
        if (modalRef.current) {
            modalRef.current.onOpen();
        }
    };

    const handleModalClose = () => {
        setCurrent({} as User);
        if (modalRef.current) {
            modalRef.current.onClose();
        }
    };

    const handleView = (id: number | string) => {
        navigate(`/admin/user/${id}`);
    };

    const handleDelete = (value: User) => {
        setCurrent((prev) => ({ ...prev, ...value }));
        if (deleteModalRef.current) {
            deleteModalRef.current.onOpen();
        }
    };

    const onCloseDelete = () => {
        setCurrent({} as User);
        if (deleteModalRef.current) {
            deleteModalRef.current.onClose();
        }
    };

    const onConfirmDelete = async () => {
        if (!currentUser.id) {
            return;
        }
        try {
            await userService.deleteUser(currentUser.id);
            revalidator.revalidate();
            notify.success("User deleted successfully");
            setCurrent({} as User);
            onCloseDelete();
        } catch (error) {
            notify.error(`An error deleting user: ${error}`);
        }
    };
    const onExport = async () => {
        setIExporting(true);
        try {
            await userService.export();
            notify.success("Data exported successfully, check your email.");
        } catch (error) {
            notify.error(`An error occurred error exporting user data: ${error}`);
        } finally {
            setIExporting(false);
        }
    };

    const rowRender = React.useCallback((user: Record<string, string>, columnKey: string | number) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "avatar":
                return (
                    <Badge key={"avatar"} isOneChar content={<CheckIcon />} color={user.is_active ? "success" : "danger"} placement="bottom-right">
                        <Avatar
                            isBordered
                            color={user.is_active ? "success" : "danger"}
                            radius="md"
                            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
                        />
                    </Badge>
                );
            case "name":
                return (
                    <div className="flex items-center space-x-3">
                        <div className="font-bold">
                            {user?.firstname} {user?.lastname}
                        </div>
                    </div>
                );
            case "email":
                return <p>{user.email}</p>;
            case "status":
                return (
                    <Chip color={user.is_superuser ? "warning" : "secondary"} variant="bordered">
                        {user.is_superuser ? "Admin" : "Member"}
                    </Chip>
                );
            case "create":
                return <time dateTime={user.created_at}>{user.created_at}</time>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleView(user.id)} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon onClick={() => handleEdit(user)} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDelete(user)} />
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
                <UserForm currentUser={currentUser} onClose={handleModalClose} type={mode} />
            </NextModal>
            <NextModal ref={deleteModalRef} size="md">
                <Confirm onClose={onCloseDelete} onConfirm={onConfirmDelete} />
            </NextModal>
        </React.Fragment>
    );
}
