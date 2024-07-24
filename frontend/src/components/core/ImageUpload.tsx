import React, { useState } from "react";
import { DragNDrop } from "./dragNDrop";
import useNotifications from "@/store/notifications";
import { Button, Image } from "@nextui-org/react";
import { EditIcon } from "nui-react-icons";
import { FileTypes } from "@/types";

interface Props {
    onUpload: (formData: any) => void;
    wsUrl?: string;
    revalidateKey?: string;
    defaultImage?: string;
}

const ImageUpload: React.FC<Props> = ({ onUpload, defaultImage = "" }) => {
    const [, notify] = useNotifications();
    const [file, setFile] = useState<File>();
    const [preview, setPreview] = useState<any>(defaultImage);
    const [status, setStatus] = useState<boolean>(false);
    const [isDirty, setDirty] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) {
            notify.error("Please select a file");
            return;
        }
        setStatus(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            await onUpload(formData);
        } catch (error) {
            notify.error(`Error uploading file: ${error}`);
        } finally {
            setStatus(false);
        }
    };

    const OnSelect = (files: File[]) => {
        setFile(files ? files[0] : undefined);

        // Preview the image
        // eslint-disable-next-line no-undef
        if (files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader?.result);
                setDirty(true);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setPreview(undefined);
        }
    };

    return (
        <React.Fragment>
            <div>
                {preview && (
                    <React.Fragment>
                        <div className="flex gap-1">
                            <Image width={300} alt="Product Image" src={preview} className="max-h-52" />
                            <Button isIconOnly onPress={() => setPreview(undefined)}>
                                <EditIcon size={24} />
                            </Button>
                        </div>
                    </React.Fragment>
                )}
                {!preview && (
                    <DragNDrop
                        onSelect={OnSelect}
                        onError={(message: string) => notify.error(message)}
                        allowsMultiple={false}
                        acceptedFiles={[FileTypes.jpeg, FileTypes.jpg, FileTypes.png]}
                    />
                )}
                {preview && isDirty && (
                    <Button
                        onClick={handleSubmit}
                        isDisabled={status}
                        isLoading={status}
                        variant="shadow"
                        color="secondary"
                        className="min-w-24 mt-2"
                    >
                        Upload{status ? "ing" : ""}
                    </Button>
                )}
            </div>
        </React.Fragment>
    );
};

export { ImageUpload };
