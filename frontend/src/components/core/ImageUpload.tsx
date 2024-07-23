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
            {/* <div className="max-w-md mx-auto bg-content2 p-6 rounded-md shadow-md relative border-dashed border-2 border-sky-500 min-h-[10rem]">
                {preview && <p className="text-xs text-gray-500 mb-1">{file?.name}</p>}
                {preview && <img src={preview} alt="Preview" className="max-w-full max-h-32" />}
                {!preview && (
                    <div className="mt-1 relative">
                        <input ref={fileInput} id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
                        <div className="text-center space-y-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#007bff" viewBox="0 0 24 24" className="h-8 w-8 inline">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z" />
                            </svg>
                            <p>
                                Drop your images here or{" "}
                                <button onClick={handleClick} className="link">
                                    browse.
                                </button>
                            </p>
                            <button type="button" onClick={handleClick} className="btn btn-sm btn-primary">
                                Upload
                            </button>
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                    </div>
                )}
            </div> */}
        </React.Fragment>
    );
};

export { ImageUpload };
