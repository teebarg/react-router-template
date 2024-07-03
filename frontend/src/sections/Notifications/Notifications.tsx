import { SnackbarProvider } from "notistack";

import { notifications } from "@/config";

import Notifier from "./Notifier";
import SnackBar from "@/components/snackbar";

function Notifications() {
    return (
        <SnackbarProvider
            maxSnack={notifications.maxSnack}
            Components={{
                customNotification: SnackBar,
            }}
        >
            <Notifier />
        </SnackbarProvider>
    );
}

export default Notifications;
