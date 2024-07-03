import React, { useEffect } from "react";
import { LoaderFunction, redirect, useFetcher, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import { useCookie } from "@/hooks/use-cookie";
import NotFound from "@/pages/NotFound";
import Navbar from "@/components/navbar";
import Meta from "@/components/Meta";
import userService from "@/services/user.service";
import { useAuth } from "@/store/auth-provider";

interface Props {}

interface profileData {
    user: Record<string, any>;
    error: boolean;
    errorMessage: string;
}

const profileLoader: LoaderFunction = async ({ request }) => {
    const { removeCookie } = useCookie();
    try {
        const user = await userService.getProfile();
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

const Profile: React.FC<Props> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fetcher = useFetcher();
    const { user, error } = useLoaderData() as profileData;

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            const params = new URLSearchParams();
            params.set("from", location.pathname);
            navigate("/login?" + params.toString());
            return;
        }
    }, []);

    if (error || !user) {
        return <NotFound />;
    }

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
                            <p className="text-sm">Firstname:</p>
                            <p className="text-lg font-semibold mt-0">{user.firstname}</p>
                        </div>
                        <div>
                            <p className="text-sm">Lastname:</p>
                            <p className="text-lg font-semibold mt-0">{user.lastname}</p>
                        </div>
                        <div>
                            <p className="text-sm">Email:</p>
                            <p className="text-lg font-semibold mt-0">{user.email}</p>
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
