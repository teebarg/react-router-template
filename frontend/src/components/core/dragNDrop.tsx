import { DropZone } from "react-aria-components";
import type { FileDropItem } from "react-aria";
import React from "react";
import { FileTrigger } from "@/components/core/fileTrigger";
import useWatch from "@/hooks/use-watch";
import { CancelIcon } from "nui-react-icons";
import { FileTypes } from "@/types";

interface DragNDropProps {
    onSelect: (files: File[]) => void;
    onError?: (message: string) => void;
    maxFileSize?: number;
}

const DragNDrop: React.FC<DragNDropProps> = ({ onSelect, onError, maxFileSize = 1500 }) => {
    const [files, setFiles] = React.useState<File[]>([]);

    useWatch(files, (newValue: File[]) => {
        onSelect(newValue);
    });

    const handleSelectedFiles = (files: File[]) => {
        const newFiles = files.filter((file: File) => {
            // Check file size (in kilobytes)
            if (file.size > maxFileSize * 1024) {
                onError?.(`File ${file.name} size exceeds ${maxFileSize} KB`);
                return;
            } else {
                return true;
            }
        });

        setFiles(newFiles);
    };

    const handleCancel = () => {
        setFiles([]);
    };

    const acceptedFiles = [FileTypes.xlsx, FileTypes.png];

    return (
        <DropZone
            className="min-w-96 max-w-md bg-content2 p-4 rounded-md shadow-md relative border-dashed border-2 border-sky-500 min-h-[10rem] flex flex-col place-content-center place-items-center"
            onDrop={async (e) => {
                const files: any = e.items.filter((file: any) => file.kind === "file" && acceptedFiles.includes(file.type)) as FileDropItem[];
                const selectedFiles: File[] = [];

                await files.forEach(async (item: FileDropItem) => {
                    const file = await item.getFile();
                    selectedFiles.push(file);
                });
                handleSelectedFiles(selectedFiles);
            }}
        >
            {files && (
                <button type="button" className="absolute top-3 right-4" onClick={handleCancel}>
                    <CancelIcon size={24} aria-hidden="true" />
                </button>
            )}
            <FileTrigger
                allowsMultiple
                acceptedFileTypes={acceptedFiles}
                onSelect={(e: FileList | null) => {
                    const files = Array.from(e ?? []);
                    handleSelectedFiles(files);
                }}
            >
                <div className="text-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#007bff" viewBox="0 0 24 24" className="h-16 w-16 inline">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z" />
                    </svg>
                    <p>
                        Drop your files here or <button className="link">browse.</button>
                    </p>
                    <button className="btn-custom group min-w-48 bg-primary text-primary-foreground">Upload</button>
                </div>
            </FileTrigger>
            <div slot="label" className="mt-4">
                {files?.map((file: File, index: number) => (
                    <span key={index} className="block">{file.name}</span>
                ))}
            </div>
        </DropZone>
    );
};

export { DragNDrop };
