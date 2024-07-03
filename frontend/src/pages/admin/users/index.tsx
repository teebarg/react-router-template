import React from "react";
import Meta from "@/components/Meta";
import { LoaderFunction, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import TableData from "../homepage/components/TableData";
import userService from "@/services/user.service";
import { useCookie } from "@/hooks/use-cookie";
import { User } from "@/models/user";
import { Pagination } from "@/types";
import { useQueryParams } from "@/hooks/use-query-params";
import { Excel } from "@/components/core/excel-uploader";

interface Props {}
interface userData {
    togs?: Record<string, any>[];
    users: User[];
    pagination: Pagination;
    error: boolean;
    errorMessage: string;
}

const usersLoader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name") ?? "";
    const page = url.searchParams.get("page");
    const { removeCookie } = useCookie();
    try {
        const { data, ...pagination } = await userService.getUsers({ name, page });
        return { users: data, pagination, error: false };
    } catch (error: any) {
        if ([422].includes(error.status)) {
            return redirect("/admin");
        }
        if ([401].includes(error.status)) {
            removeCookie("user");
            const params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);
            return redirect("/login?" + params.toString());
        }
        return { users: null, error: true, errorMessage: error.message };
    }
};

const Users: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { name } = useQueryParams();
    const { users, pagination } = useLoaderData() as userData;

    return (
        <React.Fragment>
            <Meta title="Users" />
            <div>
                <div className="max-w-7xl mx-auto p-8">
                    <h1 className="text-2xl font-semibold mb-2">Users:</h1>
                    <div className="py-4">
                        <Excel />
                    </div>
                    <TableData rows={users} pagination={pagination} query={name} />
                    <Button color="secondary" onClick={() => navigate(-1)} className="mt-6">
                        Back
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

export { Users, usersLoader };
