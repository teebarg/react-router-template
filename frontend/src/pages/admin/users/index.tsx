import React from "react";
import Meta from "@/components/Meta";
import { LoaderFunction, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import TableData from "../homepage/components/TableData";
import userService from "@/services/user.service";
import { User } from "@/models/user";
import { Pagination } from "@/types";
import { useQueryParams } from "@/hooks/use-query-params";
import { Excel } from "@/components/core/excel-uploader";

interface Props {}
interface userData {
    togs?: Record<string, any>[];
    data: User[];
    pagination: Pagination;
    error: boolean;
    errorMessage: string;
}

const usersQuery = ({ name, page }: { name: string; page: string }) => ({
    queryKey: ["users", { name, page }],
    queryFn: async () => {
        return await userService.getUsers({ name, page });
    },
});

const usersLoader =
    (isAuthenticated: any, queryClient: any): LoaderFunction =>
    async ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get("name") ?? "";
        const page = url.searchParams.get("page") ?? "";

        if (!isAuthenticated) {
            const params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);
            return redirect("/login?" + params.toString());
        }
        const query = usersQuery({ name, page });
        return queryClient.ensureQueryData(query);
    };

const Users: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { name } = useQueryParams();
    const { data: users, ...pagination } = useLoaderData() as userData;

    const id = "nK12eRTbo";

    const domain = import.meta.env.DEV ? "ws://localhost:2222" : `wss://${import.meta.env.VITE_AUTH_DOMAIN}`;
    const wsUrl = `${domain}/api/ws/users/${id}`;

    const handleUpload = async (id: string, formData: any) => {
        await userService.excelUpload({ id, formData });
    };

    return (
        <React.Fragment>
            <Meta title="Users" />
            <div>
                <div className="max-w-7xl mx-auto p-8">
                    <h1 className="text-2xl font-semibold mb-2">Users:</h1>
                    <div className="py-4">
                        <Excel onUpload={handleUpload} wsUrl={wsUrl} />
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
