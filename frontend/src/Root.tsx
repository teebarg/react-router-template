import { ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";

import { Provider } from "./provider";

import "@/styles/globals.css";
import { AuthProvider } from "@/store/auth-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
    root.render(
        <StrictMode>
            <RecoilRoot>
                <HelmetProvider>
                    <Provider>
                        <AuthProvider>
                            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                                <App />
                            </GoogleOAuthProvider>
                        </AuthProvider>
                    </Provider>
                </HelmetProvider>
            </RecoilRoot>
        </StrictMode>
    );
}

export default render;
