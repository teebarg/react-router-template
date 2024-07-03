import { useState, useEffect } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const useAddToHomeScreenPrompt = () => {
    const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const beforeInstallPromptHandler = (e: Event) => {
            e.preventDefault();
            setPromptEvent(e as BeforeInstallPromptEvent);
        };

        window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

        return () => {
            window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
        };
    }, []);

    const promptToInstall = () => {
        if (promptEvent) {
            promptEvent.prompt();
            promptEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    // eslint-disable-next-line no-console
                    console.log("User accepted the A2HS prompt");
                } else {
                    // eslint-disable-next-line no-console
                    console.log("User dismissed the A2HS prompt");
                }
                setPromptEvent(null);
            });
        }
    };

    return [promptEvent, promptToInstall] as const;
};

export default useAddToHomeScreenPrompt;
