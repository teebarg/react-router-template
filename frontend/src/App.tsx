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
import { SlideOver } from "./components/core/slideOver";
import React from "react";
import { useButton } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";

// Lazy load the sections
const HotKeys = lazy(() => import("@/sections/HotKeys"));
const Notifications = lazy(() => import("@/sections/Notifications"));
const SW = lazy(() => import("@/sections/SW"));

function App() {
    const [promptEvent, promptToInstall] = useAddToHomeScreenPrompt();
    const auth = useAuth();
    const queryClient = useQueryClient();
    let state = useOverlayTriggerState({});
    let ref = React.useRef<HTMLButtonElement>(null);
    let { buttonProps } = useButton({ onPress: state.open }, ref);
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
            <button {...buttonProps} ref={ref} className="px-4 py-2 text-white bg-blue-500 rounded-md">
                Open Slideover
            </button>
            {/* {state.isOpen && (
                <SlideOver isOpen={state.isOpen} onClose={state.close}>
                    <h2 className="text-lg font-semibold">Slideover Content</h2>
                    <p>This is some content inside the slideover.</p>
                </SlideOver>
            )} */}
            <SlideOver isOpen={state.isOpen} onClose={state.close}>
                <h2 className="text-lg font-semibold">Slideover Content</h2>
                <p>This is some content inside the slideover.</p>
                <div className="h-80">
                    hi
                </div>
            </SlideOver>
        </Fragment>
    );
}

export default App;
