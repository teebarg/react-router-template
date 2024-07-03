import React, { useEffect } from "react";
import { Outlet, ScrollRestoration, redirect, useLocation, useNavigate, useNavigation } from "react-router-dom";
import type { LoaderFunction, Location, useMatches } from "react-router-dom";
import Sidebar from "@/components/core/sidebar";
import AdminNavbar from "@/components/admin-navbar";
import { useCookie } from "@/hooks/use-cookie";
import authService from "@/services/auth.service";
import { useAuth } from "@/store/auth-provider";

const adminLoader: LoaderFunction = async ({ request }) => {
    const { removeCookie } = useCookie();
    try {
        const user = await authService.admin();
        return { user, error: false };
    } catch (error: any) {
        if ([403].includes(error.status)) {
            return redirect("/");
        }
        if ([401, 422].includes(error.status)) {
            removeCookie("user");
            const params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);
            return redirect("/login?" + params.toString());
        }
        return { user: null, error: true, errorMessage: error.message };
    }
};

interface Props {}

const AdminLayout: React.FC<Props> = () => {
    const navigation = useNavigation();
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            const params = new URLSearchParams();
            params.set("from", location.pathname);
            navigate("/login?" + params.toString());
            return;
        }
    }, []);

    // You can provide a custom implementation of what "key" should be used to
    // cache scroll positions for a given location.  Using the location.key will
    // provide standard browser behavior and only restore on back/forward
    // navigations.  Using location.pathname will provide more aggressive
    // restoration and will also restore on normal link navigations to a
    // previously-accessed path.  Or - go nuts and lump many pages into a
    // single key (i.e., anything /wizard/* uses the same key)!
    const getKey = React.useCallback((location: Location, matches: ReturnType<typeof useMatches>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const match = matches.find((m) => (m.handle as any)?.scrollMode);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((match?.handle as any)?.scrollMode === "pathname") {
            return location.pathname;
        }

        return location.key;
    }, []);
    return (
        <React.Fragment>
            <div
                className="spinner"
                style={{
                    display: navigation.state === "idle" ? "none" : "block",
                }}
            ></div>
            <div className="flex min-h-screen">
                <div className="hidden sm:block min-w-[20rem] h-screen overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="flex-1 h-screen overflow-y-auto">
                    <AdminNavbar />
                    <Outlet />
                </div>
            </div>
            <ScrollRestoration getKey={getKey} />
        </React.Fragment>
    );
};

export { adminLoader, AdminLayout };
