import React from "react";
import { LoaderFunction, redirect, useFetcher, useLoaderData } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import Navbar from "@/components/navbar";
import Meta from "@/components/Meta";
import userService from "@/services/user.service";

interface Props {}

interface profileData {
    [key: string]: any;
}

const profileQuery = () => ({
    queryKey: ["profile"],
    queryFn: async () => await userService.getProfile(),
});

const profileLoader =
    (isAuthenticated: any, queryClient: any): LoaderFunction =>
    async ({ request }) => {
        if (!isAuthenticated) {
            const params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);
            return redirect("/login?" + params.toString());
        }
        const query = profileQuery();
        return queryClient.ensureQueryData(query);
    };

const Profile: React.FC<Props> = () => {
    const fetcher = useFetcher();
    const user = useLoaderData() as profileData;


    const isLoggingOut = fetcher.formData != null;
    return (
        <React.Fragment>
            <Meta title="Profile Page" />
            <Navbar />
            <div className="px-8 py-2 bg-content1">
                <h2 className="text-base font-semibold leading-7">Personal Information</h2>
                <p className="text-sm leading-6 text-default-600">Use a permanent address where you can receive mail.</p>
                <div className="flex mt-6">
                    <div className="h-32 w-32 rounded-lg relative overflow-hidden">
                        <Image src={"/avatar.png"} alt="profile" />
                    </div>
                    <div className="flex-1 ml-6 space-y-4">
                        <div>
                            <p className="text-sm">Id:</p>
                            <p className="text-lg font-semibold mt-0">{user?.id}</p>
                        </div>
                        <div>
                            <p className="text-sm">Firstname:</p>
                            <p className="text-lg font-semibold mt-0">{user?.firstname}</p>
                        </div>
                        <div>
                            <p className="text-sm">Lastname:</p>
                            <p className="text-lg font-semibold mt-0">{user?.lastname}</p>
                        </div>
                        <div>
                            <p className="text-sm">Email:</p>
                            <p className="text-lg font-semibold mt-0">{user?.email}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <fetcher.Form method="post" action="/logout">
                        <Button type="submit" disabled={isLoggingOut} isLoading={isLoggingOut}>
                            {isLoggingOut ? "Signing out..." : "Sign out"}
                        </Button>
                    </fetcher.Form>
                </div>
            </div>
        </React.Fragment>
    );
};

export { Profile, profileLoader };
