/* eslint-disable */
import type { OptionsObject } from "notistack";
import { ReactNode } from "react";

interface LoginUser {
    firstname?: string;
    lastname?: string;
    email?: string;
    image?: string;
}

type Notifications = {
    options: OptionsObject;
    maxSnack: number;
};

type Pagination = {
    page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
};

type Column = {
    name: string;
    uid: string | number;
    sortable?: boolean;
};

type TableProps = {
    columns: Column[];
    rows?: { [key: string]: any }[];
    pagination?: Pagination;
    callbackFunction: (user: any, columnKey: string | number) => ReactNode;
    onSearchChange: (value: string) => void;
    onAddNew?: () => void;
    onExport?: () => void;
    query: string;
    canExport?: boolean;
    isExporting?: boolean;
};

type User = {
    id?: string | number;
    firstname?: string;
    lastname?: string;
    email?: string;
    is_active?: boolean;
    is_superuser?: boolean;
};

type CreateUser = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

type UpdateUser = {
    firstname?: string;
    lastname?: string;
    email?: string;
    is_active?: boolean;
    is_superuser?: boolean;
};

type ContactMessage = {
    name: string;
    email: string;
    phone?: string;
    message: string;
};

export type { Pagination, Column, TableProps, Notifications, LoginUser, User, CreateUser, UpdateUser, ContactMessage };
