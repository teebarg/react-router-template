import { Fragment, Suspense, lazy } from "react";

import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import asyncComponentLoader from "@/utils/loader";
import LoadingPage from "@/components/loading";
import { useAuth } from "@/store/auth-provider";
import useAddToHomeScreenPrompt from "@/hooks/useAddToHomeScreenPrompt";
import { PwaBanner } from "@/components/pwa-banner";
import { useQueryClient } from "@tanstack/react-query";
import root from "@/routes/root";
import ErrorPage from "@/pages/ErrorPage";

// Lazy load the sections
const HotKeys = lazy(() => import("@/sections/HotKeys"));
const Notifications = lazy(() => import("@/sections/Notifications"));
const SW = lazy(() => import("@/sections/SW"));

function App() {
    const [promptEvent, promptToInstall] = useAddToHomeScreenPrompt();
    const auth = useAuth();
    const queryClient = useQueryClient();
    const router = createBrowserRouter([
        {
            id: "root",
            path: "/",
            loader() {
                // Our root route always provides the user, if logged in
                return { user: "John Doe" };
            },
            Component: asyncComponentLoader(() => import("@/pages/layout")),
            errorElement: <ErrorPage />,
            children: root(queryClient, auth),
        },
        {
            path: "/logout",
            async action() {
                await auth.logout();
                return redirect("/");
            },
        },
        { path: "*", element: <NotFound /> },
    ]);

    if (import.meta.hot) {
        import.meta.hot.dispose(() => router.dispose());
    }
    return (
        <Fragment>
            {promptEvent && <PwaBanner onClick={promptToInstall} />}
            <Suspense fallback={<LoadingPage />}>
                <Notifications />
                <HotKeys />
                <SW />
            </Suspense>
            <RouterProvider router={router} fallbackElement={<LoadingPage />} />
        </Fragment>
    );
}

export default App;
