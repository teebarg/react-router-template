import type { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

interface NewOption extends OptionsObject {
    type?: string | undefined;
}

interface Notification {
    message: SnackbarMessage;
    options: NewOption;
    dismissed: boolean;
}

declare module "notistack" {
    export interface VariantOverrides {
        // define custom variants
        customNotification: {
            message?: string;
        };
    }
}

type Actions = {
    push: (notification: Partial<Notification>) => SnackbarKey;
    close: (key: SnackbarKey, dismissAll?: boolean) => void;
    remove: (key: SnackbarKey) => void;
    error: (message: string) => void;
    success: (message: string) => void;
};

export type { Notification, Actions };
