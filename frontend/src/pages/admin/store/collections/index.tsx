import React from "react";
import Meta from "@/components/Meta";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useQueryParams } from "@/hooks/use-query-params";
import { Excel } from "@/components/core/excel-uploader";
import TableData from "./components/TableData";
import collectionsService from "@/services/collections.service";

interface Props {}

const collectionsQuery = ({ name, page }: { name: string; page: string }) => ({
    queryKey: ["collections", { name, page }],
    queryFn: async () => {
        return await collectionsService.all({ name, page });
    },
});

const collectionsLoader =
    (queryClient: any): LoaderFunction =>
    async ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get("name") ?? "";
        const page = url.searchParams.get("page") ?? "";

        const query = collectionsQuery({ name, page });
        return queryClient.ensureQueryData(query);
    };

const Collections: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { name } = useQueryParams();
    const { collections, ...pagination } = useLoaderData() as any;

    const id = "nK12eRTbo";

    const domain = import.meta.env.DEV ? "ws://localhost:4030" : `wss://${import.meta.env.VITE_DOMAIN}`;
    const wsUrl = `${domain}/api/ws/upload/${id}`;

    const handleUpload = async (id: string, formData: any) => {
        await collectionsService.excelUpload({ id, formData });
    };

    return (
        <React.Fragment>
            <Meta title="Collections" />
            <div>
                <div className="max-w-7xl mx-auto p-8">
                    <h1 className="text-2xl font-semibold mb-2">Collections:</h1>
                    <div className="py-4">
                        <Excel onUpload={handleUpload} wsUrl={wsUrl}/>
                    </div>
                    <TableData rows={ collections } pagination={pagination} query={name} />
                    <Button color="secondary" onClick={() => navigate(-1)} className="mt-6">
                        Back
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

export { Collections, collectionsLoader };