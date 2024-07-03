import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import useNotifications from "@/store/notifications";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/store/auth-provider";
import authService from "@/services/auth.service";

interface Props {}

const GoogleLogin: React.FC<Props> = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";

    const navigate = useNavigate();

    const [, notify] = useNotifications();
    const { login } = useAuth();

    const handleGoogleSignIn = useGoogleLogin({
        onSuccess: async (codeResponse: any) => {
            const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                method: "GET",
                headers: { Authorization: `Bearer ${codeResponse.access_token}` },
            }).then((res) => res.json());

            const firstname = userInfo.given_name;
            const lastname = userInfo.family_name;
            const email = userInfo.email;

            try {
                const user = await authService.socialLogin({
                    firstname,
                    lastname,
                    email,
                });
                if (user) {
                    login({ firstname, lastname, email });
                    navigate(from ?? "/");
                }
            } catch (error) {
                notify.error(`Google Login request failed: ${error}`);
            }
        },
        onError: (errorResponse: any) => {
            notify.error(`Use Google Login request failed: ${errorResponse}`);
        },
    });

    return (
        <React.Fragment>
            <Button
                fullWidth
                size="lg"
                variant="flat"
                startContent={<img src="/google.svg" alt="Google" className="w-6" />}
                onPress={() => handleGoogleSignIn()}
            >
                Sign in with Google
            </Button>
        </React.Fragment>
    );
};

export { GoogleLogin };
