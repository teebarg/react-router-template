import React from "react";
import Meta from "@/components/Meta";
import { LoaderFunction, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Chip, Image } from "@nextui-org/react";
import userService from "@/services/user.service";
import { useCookie } from "@/hooks/use-cookie";

interface Props {}
interface userData {
    user: Record<string, any>;
    error: boolean;
    errorMessage: string;
}

const userLoader: LoaderFunction = async ({ request, params }) => {
    const { removeCookie } = useCookie();
    try {
        const user = await userService.getUser(`${params.userId}`);
        return { user, error: false };
    } catch (error: any) {
        if ([401, 422].includes(error.status)) {
            removeCookie("user");
            const params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);
            return redirect("/login?" + params.toString());
        }
        return { user: null, error: true, errorMessage: error.message };
    }
};

const User: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { userId } = useParams<"userId">();
    const { user, error } = useLoaderData() as userData;

    if (error) {
        navigate(-1);
    }

    return (
        <React.Fragment>
            <Meta title="User" />
            <div>
                <div className="max-w-7xl mx-auto bg-content1 p-8 rounded-md shadow-md shadow-fuchsia-200 mt-6">
                    <h1 className="text-2xl font-semibold mb-2">User: {userId}</h1>
                    {user && (
                        <div>
                            <Image width={300} alt="NextUI hero Image" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" />
                            <div className="mt-4 flex gap-2 items-center">
                                Name:{" "}
                                <span className="text-lg">
                                    {" "}
                                    {user.firstname}
                                    {"  "}
                                    {user.lastname}
                                </span>{" "}
                                <Chip color={user.is_superuser ? "warning" : "secondary"} variant="bordered" size="sm">
                                    {user.is_superuser ? "Admin" : "Member"}
                                </Chip>
                            </div>
                            <p>
                                Email: <span className="text-lg mr-2"> {user.email}</span>
                            </p>
                            <p>
                                Role: <span className="text-lg">{user.is_superuser ? "Admin" : "Member"}</span>
                            </p>
                            <p>
                                Date: <span className="text-lg">{user.created_at}</span>
                            </p>
                        </div>
                    )}
                    <Button color="secondary" onClick={() => navigate(-1)} className="mt-6">
                        Back
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

export { User, userLoader };
