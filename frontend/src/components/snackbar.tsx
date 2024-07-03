import React, { ReactNode } from "react";
import { CustomContentProps, useSnackbar } from "notistack";
import cn from "classnames";
import { CancelIcon, CheckIcon } from "nui-react-icons";

type Types = "default" | "danger" | "info" | "success" | "warning";

interface AlertProps extends CustomContentProps {
    type: Types;
}
// eslint-disable-next-line react/display-name
const SnackBar = React.forwardRef<HTMLDivElement, AlertProps>(({ id, message, type = "default" }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const color: Record<Types, string> = {
        default: "border-default-50 bg-default-700 text-default-50",
        danger: "border-red-700 bg-red-100 text-red-700",
        info: "border-blue-700 bg-blue-100 text-blue-700",
        success: "border-green-700 bg-green-100 text-green-700",
        warning: "border-yellow-700 bg-yellow-100 text-yellow-700",
    };

    const icon: Record<Types, ReactNode> = {
        default: <CheckIcon className="h-8 w-8 text-current" aria-hidden="true" />,
        danger: <CheckIcon className="h-10 w-10 text-current" aria-hidden="true" />,
        info: <CheckIcon className="h-8 w-8 text-current" aria-hidden="true" />,
        success: <CheckIcon className="h-8 w-8 text-current" aria-hidden="true" />,
        warning: <CheckIcon className="h-8 w-8 text-current" aria-hidden="true" />,
    };

    const handleDismiss = React.useCallback(() => {
        closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
        <div key={id} ref={ref} className={cn("border-l-4 p-4 min-w-[20vw] max-w-md rounded-md font-medium", color[type])}>
            <div className="flex items-center gap-2">
                <div>{icon[type]}</div>
                <div className="pr-2">{message}</div>
                <CancelIcon onClick={handleDismiss} className="fill-current cursor-pointer ml-auto" aria-hidden="true" strokeWidth={2} size={28} />
            </div>
        </div>
    );
});

SnackBar.displayName = "SnackBar";

export default SnackBar;
