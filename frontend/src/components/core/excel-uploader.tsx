import React, { useEffect, useState } from "react";
import useNotifications from "@/store/notifications";
import { useWebSocket } from "@/hooks/use-websocket";
import { Button, Progress } from "@nextui-org/react";
import { DragNDrop } from "./dragNDrop";

interface Props {
    onUpload: (id: string, formData: any) => void;
    wsUrl: string
}

const Excel: React.FC<Props> = ({ onUpload, wsUrl }) => {
    const id = "nK12eRTbo";
    const [, notify] = useNotifications();
    const [file, setFile] = useState<File>();
    const [status, setStatus] = useState<boolean>(false);
    const { messages: wsMessages, connect: initializeWebsocket, disconnect: disconnectWebsocket } = useWebSocket({ type: ["sheet-processor"] });

    const currentMessage = wsMessages[wsMessages.length - 1];

    useEffect(() => {
        initializeWebsocket(wsUrl);
        return () => {
            disconnectWebsocket();
        };
    }, []);

    const currentStatus = () => {
        if (status) {
            return "Submitting";
        }
        return currentMessage?.status == "Processing" ? "Processing" : "Submit";
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) {
            notify.error("Please select a file");
            return;
        }
        setStatus(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("batch", "batch1");

        try {
            await onUpload(id, formData);
        } catch (error) {
            notify.error(`Error uploading file: ${error}`);
        } finally {
            setStatus(false);
        }
    };

    const OnSelect = (files: File[]) => {
        setFile(files ? files[0] : undefined);
    };

    return (
        <React.Fragment>
            <div className="flex gap-2">
                <DragNDrop onSelect={OnSelect} onError={(message: string) => notify.error(message)} />
                <Button
                    onClick={handleSubmit}
                    isDisabled={status || currentMessage?.status == "Processing"}
                    isLoading={status || currentMessage?.status == "Processing"}
                    variant="shadow"
                    color="secondary"
                    className="min-w-48"
                >
                    {currentStatus()}
                </Button>
            </div>
            <div className="mt-8">
                {wsMessages && (
                    <Progress
                        aria-label="Downloading..."
                        size="sm"
                        value={(currentMessage?.processed_rows / currentMessage?.total_rows) * 100 || 0}
                        color="success"
                        label={`progress: ${currentMessage?.processed_rows || 0} / ${currentMessage?.total_rows || 0} rows`}
                        showValueLabel={true}
                        className=""
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export { Excel };
